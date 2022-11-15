const salesModel = require('../models/salesModels');
const validateInputs = require('./validations/validationsInputValues');

const insertSales = async (sale) => {
  const { type, message } = await validateInputs.validateNewSale(sale);
  if (type) {
    return { type, message };
  }
  const saleId = await salesModel.insertSales();
  await Promise
    .all(sale.map((s) => salesModel.insertSalesProduct(s, saleId)));

  return { type: null, message: 'sales successfully registered' };
};

module.exports = {
  insertSales,
};
