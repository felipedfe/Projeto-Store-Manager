const Joi = require('joi');
const ProductService = require('../services/ProductService');

// GET
const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  console.log(res);
  res.status(200).send(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);

  if (product.error) {
    return next(product.error);
  }

  return res.status(200).json(product);
};

// POST
const addProduct = async (req, res, next) => {
  const { name } = req.body;

  const productNameAndId = await ProductService.addProduct(name);

  if (productNameAndId.error) return next(productNameAndId.error);

  return res.status(201).json(productNameAndId);
};

const addSales = async (req, res, next) => {
  const items = req.body;

  // aqui são checados os erros no corpo da requisição
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  })).validate(items);

  if (error) {
    console.log(error.message);
    return next(error);
  }

  // aqui é checado no BD se existe um produto com o productId passado na requisição
  const id = await ProductService.checkIds(items);
  console.log(id);
  if (id.error) return next(id.error);

  const sale = await ProductService.addSales(items);

  return res.status(201).json(sale);
};

module.exports = {
  getAll,
  getById,
  addProduct,
  addSales,
};
