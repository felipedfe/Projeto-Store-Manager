const Joi = require('joi');
const ProductService = require('../services/ProductService');

// GET
const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

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

const searchProducts = async (req, res, _next) => {
  const { q } = req.query;

  const result = await ProductService.searchProducts(q);

  res.status(200).send(result);
};

// POST
const addProduct = async (req, res, next) => {
  const { name } = req.body;

  const productNameAndId = await ProductService.addProduct(name);

  if (productNameAndId.error) return next(productNameAndId.error);

  return res.status(201).json(productNameAndId);
};

// PUT
const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  const { error } = Joi.array().items(Joi.object({
    name: Joi.string().min(5).required(),
  })).validate([req.body]);

  if (error) return next(error);

  const { name } = req.body;
  const update = await ProductService.updateProduct(id, name);

  if (update.error) return next(update.error);

  return res.status(200).send(update);
};

// DELETE
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id);

  if (result.error) return next(result.error);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
