const connection = require('./connection');

const getSalesQuery = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date 
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`;

const productIdQuery = 'SELECT id FROM StoreManager.products;';

const addSalesQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';

const productsQuery = `
  INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`;

const getBySaleIdQuery = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date 
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`;

const serializeSales = (sales) => sales.map((item) => ({
  saleId: item.sale_id,
  date: item.date,
  productId: item.product_id,
  quantity: item.quantity,
}));

const serializeSalesById = (sale) => sale.map((item) => ({
  date: item.date,
  productId: item.product_id,
  quantity: item.quantity,
}));

// GET
const getProductsIds = async () => {
  const [ids] = await connection.execute(productIdQuery);
  return ids;
};

const getSales = async () => {
  const [sales] = await connection.execute(getSalesQuery);
  return serializeSales(sales);
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(getBySaleIdQuery, [id]);
  return serializeSalesById(sale);
};

// POST
const addSales = async (itemsSold) => {
  const [sale] = await connection.execute(addSalesQuery);

  itemsSold.map(async ({ productId, quantity }) => {
    await connection.execute(productsQuery, [sale.insertId, productId, quantity]);
  });

  return {
    id: sale.insertId,
    itemsSold,
  };
};

module.exports = {
  getSales,
  getProductsIds,
  addSales,
  getSalesById,
};
