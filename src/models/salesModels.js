const connection = require('../db/connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())', [],
  );
  return insertId;
};

const insertSalesProduct = async (sales, salesId) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [salesId, sales.productId, sales.quantity],
  );

  return insertId;
};

module.exports = {
  insertSales,
  insertSalesProduct,
};
