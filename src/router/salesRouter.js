const express = require('express');
const salesController = require('../controllers/salesController');
const saleValidate = require('../middlewares/validateSale');

const routerSales = express.Router();

routerSales.post('/',
  saleValidate.validateSale,
  salesController.insertSales);

module.exports = routerSales;
