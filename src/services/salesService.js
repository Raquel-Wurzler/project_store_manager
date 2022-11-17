const salesModel = require('../models/salesModels');
const validateInputs = require('./validations/validationsInputValues');

const insertSales = async (sale) => {
    const validId = await validateInputs.validProductId(sale);
  if (validId) {
    return validId;
  }
  const validQuant = sale.map((s) => s.quantity)
    .map((q) => validateInputs.validateQuantity(q));
  const errorQuant = validQuant.find((q) => q.type === 'INVALID_VALUE');
  if (errorQuant) {
    return errorQuant;
  }
  const saleId = await salesModel.insertSales();
  await Promise.all(sale.map((s) => salesModel.insertSalesProduct(s, saleId)));

  return { type: null, message: { id: saleId, itemsSold: sale } };
};

const findAll = async () => {
  const product = await salesModel.findAll();
  return { type: null, message: product };
};

const findById = async (saleId) => {
  const error = validateInputs.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModel.findById(saleId);
  if (sale) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
};

module.exports = {
  insertSales,
  findAll,
  findById,
};
