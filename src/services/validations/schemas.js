const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductsSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const quantitySchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
  addProductsSchema,
  quantitySchema,
};
