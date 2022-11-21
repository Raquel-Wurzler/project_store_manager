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
    `INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity)
    VALUES (?, ?, ?)`,
    [sales.productId, salesId, sales.quantity],
  );

  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT saleP.sale_id, saleP.product_id, saleP.quantity, sale.date
    FROM StoreManager.sales_products AS saleP
    INNER JOIN StoreManager.sales AS sale
    ON saleP.sale_id = sale.id
    ORDER BY saleP.sale_id, saleP.product_id`,
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT saleP.product_id, saleP.quantity, sale.date
    FROM StoreManager.sales_products AS saleP
    INNER JOIN StoreManager.sales AS sale
    ON saleP.sale_id = sale.id
    WHERE saleP.sale_id = ?`,
    [saleId],
  );
  return camelize(sale);
};

const deleteSales = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?`,
    [id],
  );
  return result;
};

const updateSales = async (productId, saleId, quantity) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE product_id = ?
    AND sale_id = ?`,
    [quantity, productId, saleId],
  );
  return result;
};

module.exports = {
  insertSales,
  insertSalesProduct,
  findAll,
  findById,
  deleteSales,
  updateSales,
};
