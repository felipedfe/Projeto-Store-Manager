const connection = require('./connection');

// GET
const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);

  if (product.length === 0) {
    return null;
  }

  return product[0];
};

// POST
const addProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products(name) VALUES(?);';
  const [product] = await connection.execute(query, [name]);

  return {
    id: product.insertId,
    name,
  };
};

// Sales queries
const saleQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
const productsQuery = `
INSERT INTO StoreManager.sales_products
(sale_id, product_id, quantity) VALUES (?, ?, ?);`;
const productIdQuery = 'SELECT id FROM StoreManager.products;';

const addSales = async (itemsSold) => {
  const [sale] = await connection.execute(saleQuery);

  itemsSold.map(async ({ productId, quantity }) => {
    await connection.execute(productsQuery, [sale.insertId, productId, quantity]);
  });

  return {
    id: sale.insertId,
    itemsSold,
  };
};

const getProductsIds = async () => {
  const [ids] = await connection.execute(productIdQuery);
  return ids;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  addSales,
  getProductsIds,
};