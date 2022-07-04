const ProductModel = require('../models/ProductModel');

// aqui é retornado um array com um boolean e um erro caso o NAME for inválido
const validateName = (name) => {
  if (!name) {
    return [false, {
      error: {
        code: 'badRequest',
        message: '"name" is required',
      },
    }];
  }
  if (name.length < 5) {
    return [false, {
      error: {
        code: 'unprocessableEntity',
        message: '"name" length must be at least 5 characters long',
      },
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

const getSales = async () => {
  const sales = ProductModel.getSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = await ProductModel.getSalesById(id);

  if (sale.length === 0) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return sale;
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
  let check;
  items.forEach(({ productId }) => {
    if (!idsArray.includes(productId)) {
      check = false;
    }
  });

  if (check === false) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  return {};
};

// PUT
const updateProduct = async (id, name) => {
  const update = await ProductModel.updateProduct(id, name);

  if (!update.affectedRows) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return update.response;
};

// DELETE

const deleteProduct = async (id) => {
  const result = await ProductModel.deleteProduct(id);
  if (!result.affectedRows) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return {};
};

module.exports = {
  getAll,
  getById,
  addProduct,
  addSales,
  checkIds,
  getSales,
  getSalesById,
  updateProduct,
  deleteProduct,
};