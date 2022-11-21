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

const deleteSales = async (id) => {
  const result = await salesModel.deleteSales(id);
  if (result.affectedRows === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: { id } };
};

const updateSales = async (saleId, salesArray) => {
  const validQuant = salesArray.map((s) => s.quantity)
    .map((q) => validateInputs.validateQuantity(q));
  const errorQuant = validQuant.find((q) => q.type === 'INVALID_VALUE');
  if (errorQuant) return errorQuant;

  const validProductId = await validateInputs.validProductId(salesArray);
  if (validProductId) return validProductId;

  const validSaleId = await findById(saleId);
  if (validSaleId.type === 'SALE_NOT_FOUND') {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await Promise.all(salesArray.map((sale) => salesModel
    .updateSales(sale.productId, saleId, sale.quantity)));
  return { type: null, message: { saleId, itemsUpdated: salesArray } };
};

module.exports = {
  insertSales,
  findAll,
  findById,
  deleteSales,
  updateSales,
};
