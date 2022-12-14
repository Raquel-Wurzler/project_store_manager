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
  const error = validateInputs.validateNameProducts(name);
  if (error.type) return error;

  const newProductsId = await productModel.insert(name);
  const newProducts = await productModel.findById(newProductsId);

  return { type: null, message: newProducts };
};

const updateProduct = async (id, product) => {
  const error = validateInputs.validateNameProducts(product);
  if (error.type) return error;
  const result = await productModel.updateProduct(id, product.name);
  if (result.affectedRows === 0) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: { id, name: product.name } };
};

const deleteProduct = async (productId) => {
  const result = await productModel.deleteProduct(productId);
  if (result.affectedRows === 0) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: { productId } };
};

const searchProducts = async (searchTerm) => {
  const result = await productModel.searchProducts(searchTerm);
  if (!searchTerm) {
    const allProducts = await findAll();
    return allProducts;
  }
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  createProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
};
