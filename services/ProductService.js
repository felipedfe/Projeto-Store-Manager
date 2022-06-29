const ProductModel = require('../models/ProductModel');

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

module.exports = {
  getAll,
  getById,
};