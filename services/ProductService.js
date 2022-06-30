const ProductModel = require('../models/ProductModel');

// GET
const getAll = async () => {
  const products = await ProductModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
 
  return product;
};

// POST
const addProduct = async (name) => {
  const productNameAndId = await ProductModel.addProduct(name);
  return productNameAndId;
};

module.exports = {
  getAll,
  getById,
  addProduct,
};