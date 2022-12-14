const SalesModel = require('../models/SalesModel');
const { throwError } = require('../helpers');

const checkIds = async (items) => {
  const ids = await SalesModel.getProductsIds();
  const idsArray = ids.map((idObject) => idObject.id);
  let check;
  items.forEach(({ productId }) => {
    if (!idsArray.includes(productId)) {
      check = false;
    }
  });

  if (check === false) return throwError('notFound', 'Product not found');

  return {};
};

// GET
const getSales = async () => {
  const sales = SalesModel.getSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = await SalesModel.getSalesById(id);

  if (sale.length === 0) return throwError('notFound', 'Product not found');

  return sale;
};

// POST
const addSales = async (items) => {
  const sale = await SalesModel.addSales(items);
  return sale;
};

// DELETE
const deleteSales = async (id) => {
  const result = await SalesModel.deleteSales(id);
  
  if (!result.affectedRows) return throwError('notFound', 'Product not found');

  return {};
};

module.exports = {
  getSales,
  checkIds,
  addSales,
  getSalesById,
  deleteSales,
};
