const connection = require('./connection');

const updateProductQuery = `
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?;`;
const deleteProductQuery = 'DELETE FROM StoreManager.products WHERE id = ?;';

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
  console.log(product);
  return {
    id: product.insertId,
    name,
  };
};

// PUT
const updateProduct = async (id, name) => {
  const [result] = await connection.execute(updateProductQuery, [name, id]);
  console.log('result --> ', result);
  const { affectedRows } = result;
  return {
    response: {
      id,
      name,
    },
    affectedRows,
  };
};

// DELETE
const deleteProduct = async (id) => {
  const [result] = await connection.execute(deleteProductQuery, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};