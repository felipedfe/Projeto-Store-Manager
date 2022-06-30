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

module.exports = {
  getAll,
  getById,
  addProduct,
};