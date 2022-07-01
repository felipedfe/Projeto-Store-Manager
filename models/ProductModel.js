const connection = require('./connection');

// Sales queries
const addSalesQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
const productsQuery = `
  INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`;
const productIdQuery = 'SELECT id FROM StoreManager.products;';
const getSalesQuery = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date 
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`;
const getBySaleIdQuery = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, s.date 
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`;
// const updateProductQuery = `
//   UPDATE StoreManager.products
//   SET name = 'Martelo do Batman'
//   WHERE id = 1;`;

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

const getSales = async () => {
  const [sales] = await connection.execute(getSalesQuery);
  return serializeSales(sales);
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(getBySaleIdQuery, [id]);
  return serializeSalesById(sale);
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
  getSales,
  getSalesById,
};