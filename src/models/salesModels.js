const camelize = require('camelize');
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

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return camelize(result);
};

const findById = async (salesId) => {
  const [sale] = await connection.execute(
    `SELECT saleP.product_id, saleP.quantity, sale.date
    FROM StoreManager.sales_products AS saleP
    INNER JOIN StoreManager.sales AS sale
    ON saleP.sale_id = sale.id
    WHERE saleP.sale_id = ?`,
    [salesId],
  );
  return camelize(sale);
};

module.exports = {
  insertSales,
  insertSalesProduct,
  findAll,
  findById,
};
