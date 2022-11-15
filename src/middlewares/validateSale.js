const validateSale = (req, res, next) => {
  const sale = req.body;
  for (let index = 0; index < sale.length; index += 1) {
    if (sale[index].quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (!sale[index].productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }
  return next();
};

module.exports = {
  validateSale,
};
