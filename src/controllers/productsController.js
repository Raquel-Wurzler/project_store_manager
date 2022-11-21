const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  return res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const createProducts = async (req, res) => {
  const name = req.body;
  const { type, message } = await productsService.createProducts(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const name = req.body;
  const { type, message } = await productsService.updateProduct(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json();
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.searchProducts(q);
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
};
