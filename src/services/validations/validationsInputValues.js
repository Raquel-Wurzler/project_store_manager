const schema = require('./schemas');
const productsModel = require('../../models/productsModel');

const validateId = (id) => {
  const { error } = schema.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProducts = (name) => {
  const { error } = schema.addProductsSchema
    .validate(name);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

const validateIfProductExists = async (productId) => {
  const { error } = schema.idSchema.validate(productId);
  if (error) {
    return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  }
  const product = await productsModel.findById(productId);
  if (!product) {
    return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const validProductId = async (sale) => {
  const ids = sale.map((s) => s.productId)
    .map(async (p) => validateIfProductExists(p));
  const promiseIds = await Promise.all(ids);
  const noId = promiseIds.find((i) => i.type === 'ID_NOT_FOUND');
  return noId;
};

const validateQuantity = (q) => {
  const { error } = schema.quantitySchema.validate(q);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProducts,
  validProductId,
  validateQuantity,
};
