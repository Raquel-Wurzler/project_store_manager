const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/productsModel');
const productService = require('../../../src/services/productsService');
const productServiceMock = require('./mocks/productsServices.mock');

describe('Checking product service', function () {
  afterEach(sinon.restore);
  describe('Product listing', function () {
    it('Returns the complete list of products', async function () {
      sinon.stub(productModel, 'findAll').resolves(productServiceMock.allProducts);
      const result = await productService.findAll();
      expect(result.message).to.deep.equal(productServiceMock.allProducts);
    });
  });
  describe('Search for a product', function () {
    it('Returns an error if it receives an invalid ID', async function () {
      const result = await productService.findById(0);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    it('Returns an error if the product does not exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await productService.findById(1);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Product not found' });
      expect(result.message instanceof Object).to.equal(true);
    });
    it('Returns the product if existing ID', async function () {
      sinon.stub(productModel, 'findById').resolves(productServiceMock.allProducts[0]);
      const result = await productService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productServiceMock.allProducts[0]);
    });
  });
  describe('Registration of a product with invalid values', function () {
    it('Returns an error when passing an invalid name', async function () {
      const result = await productService.createProducts({ name: 31 });
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });
  describe('Registration of a product with valid values', function () {
    it('Returns the registered product ID', async function () {
      sinon.stub(productModel, 'insert').resolves(productServiceMock.allProducts[1].name);
      sinon.stub(productModel, 'findById').resolves(productServiceMock.allProducts[1]);
      const result = await productService.createProducts(productServiceMock.validProduct);
      expect(result.type).to.equal(null);
      expect(result).to.deep.equal({ type: null, message: productServiceMock.allProducts[1] });
    });
  });
  describe('Deleting a product by Id', function () {
    it('Successfully', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves({ affectedRows: 1 });
      const result = await productService.deleteProduct(2);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ productId: 2 });
    });
    it('With error', async function () {
      sinon.stub(productModel, 'deleteProduct').resolves({ affectedRows: 0 });
      const result = await productService.deleteProduct(0);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });
});