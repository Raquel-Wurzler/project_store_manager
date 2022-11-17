const salesModel = require('../models/salesModels');
const validateInputs = require('./validations/validationsInputValues');

const insertSales = async (sale) => {
  const validQuant = sale.map((s) => s.quantity)
    .map((q) => validateInputs.validateQuantity(q));
  const errorQuant = validQuant.find((q) => q.type === 'INVALID_VALUE');
  if (errorQuant) {
    return errorQuant;
  }
  const validId = await validateInputs.validProductId(sale);
  if (validId) {
    return validId;
  }
  const saleId = await salesModel.insertSales();
  await Promise.all(sale.map((s) => salesModel.insertSalesProduct(s, saleId)));

  return { type: null, message: { id: saleId, itemsSold: sale } };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = validateInputs.validateId(saleId);
  if (error.type) return error;
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  }
  return { type: null, message: sale };
};

module.exports = {
  insertSales,
  findAll,
  findById,
};
