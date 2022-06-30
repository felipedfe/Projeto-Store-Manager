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

// POST
const addProduct = async (req, res, _next) => {
  const { name } = req.body;
  const productNameAndId = await ProductService.addProduct(name);
  return res.status(201).json(productNameAndId);
};

module.exports = {
  getAll,
  getById,
  addProduct,
};
