const schema = require('./schemas');

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

module.exports = {
  validateId,
  validateNewProducts,
};
