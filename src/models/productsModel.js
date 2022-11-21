const camelize = require('camelize');
const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findById = async (productsId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productsId],
  );
  return camelize(product);
};

const insert = async (product) => {
  const columns = Object.keys(product)
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateProduct = async (id, product) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [product, id],
  );
  return result;
};

const deleteProduct = async (productId) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?`,
    [productId],
  );
  return result;
};

const searchProducts = async (searchTerm) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name LIKE ?`,
    [`%${searchTerm}%`],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  deleteProduct,
  searchProducts,
};
