const connection = require('../db/connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return insertId;
};

const insertSalesProduct = async (sales, salesId) => {
  const columns = Object.keys(sales)
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(sales)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
    [...Object.values(sales), salesId],
  );

  return insertId;
};

module.exports = {
  insertSales,
  insertSalesProduct,
};
