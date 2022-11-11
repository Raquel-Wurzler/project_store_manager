const express = require('express');
const productsController = require('../controllers/productsController');

const routerProduct = express.Router();

routerProduct.get('/', productsController.listProducts);
routerProduct.get('/:id', productsController.getProducts);

module.exports = routerProduct;