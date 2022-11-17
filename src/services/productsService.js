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
  return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
};

const createProducts = async (name) => {
  const error = validateInputs.validateNewProducts(name);
  if (error.type) return error;

  const newProductsId = await productModel.insert(name);
  const newProducts = await productModel.findById(newProductsId);

  return { type: null, message: newProducts };
};

const deleteProduct = async (productId) => {
  const result = await productModel.deleteProduct(productId);
  if (result.affectedRows === 0) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: { productId } };
};

module.exports = {
  findAll,
  findById,
  createProducts,
  deleteProduct,
};
