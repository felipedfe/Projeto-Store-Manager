const SalesModel = require('../models/SalesModel');

const checkIds = async (items) => {
  const ids = await SalesModel.getProductsIds();
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

// GET
const getSales = async () => {
  const sales = SalesModel.getSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = await SalesModel.getSalesById(id);

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
const addSales = async (items) => {
  const sale = await SalesModel.addSales(items);
  return sale;
};

module.exports = {
  getSales,
  checkIds,
  addSales,
  getSalesById,
};
