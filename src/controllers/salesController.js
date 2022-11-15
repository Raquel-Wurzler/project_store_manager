const salesService = require('../services/salesService');
const errorMap = require('../utils/errorMap');

const insertSales = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.insertSales(sale);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(201).json(message);
};

module.exports = {
  insertSales,
};
