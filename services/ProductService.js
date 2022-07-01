const ProductModel = require('../models/ProductModel');

// aqui é retornado um array com um boolean e um erro caso o NAME for inválido
const validateName = (name) => {
  if (!name) {
    return [false, { error: {
        code: 'badRequest',
        message: '"name" is required' },
    }];
  }
  if (name.length < 5) {
    return [false, { error: {
        code: 'unprocessableEntity',
        message: '"name" length must be at least 5 characters long' },
    }];
  }
  return [true];
};

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
  if (!validateName(name)[0]) return validateName(name)[1];

  const productNameAndId = await ProductModel.addProduct(name);

  return productNameAndId;
};

const addSales = async (items) => {
  const sale = await ProductModel.addSales(items);
  return sale;
};

const checkIds = async (items) => {
  const ids = await ProductModel.getProductsIds();
  const idsArray = ids.map((idObject) => idObject.id);
  let teste;
  items.forEach(({ productId }) => {
    // teste = ids.find((it) => it.id !== item.productId);
    // if ( {productId })
  
    if (!idsArray.includes(productId)) {
      teste = false;
    }
  });

  if (teste === false) {
    console.log(teste);
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  return 'oi';
};

module.exports = {
  getAll,
  getById,
  addProduct,
  addSales,
  checkIds,
};