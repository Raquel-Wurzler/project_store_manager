const express = require('express');
const productsController = require('../controllers/productsController');
const nameValidate = require('../middlewares/validateName');

const routerProduct = express.Router();

routerProduct.get('/', productsController.listProducts);
routerProduct.get('/:id', productsController.getProducts);
routerProduct.post('/', nameValidate.validateName, productsController.createProducts);
routerProduct.delete('/:id', productsController.deleteProduct);

module.exports = routerProduct;
