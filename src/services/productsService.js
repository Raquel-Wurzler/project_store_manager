const productModel = require('../models/productsModel');
const validateInputs = require('./validations/validationsInputValues');

const findAll = async () => {
  const product = await productModel.findAll();
  return { type: null, message: product };
};

const findById = async (passengerId) => {
  const error = validateInputs.validateId(passengerId);
  if (error.type) return error;

  const product = await productModel.findById(passengerId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};
