const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result);
};

const findById = async (productsId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productsId],
  );
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};
