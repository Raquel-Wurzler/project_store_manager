const salesService = require('../services/salesService');
const errorMap = require('../utils/errorMap');

const insertSales = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.insertSales(sale);
  if (type === 'INVALID_VALUE') {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  if (type === 'ID_NOT_FOUND') {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { message } = await salesService.findAll();
  return res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  listSales,
  getSales,
};
