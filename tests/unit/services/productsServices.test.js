const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/productsModel')
const productService = require('../../../src/services/productsService');
const productServiceMock = require('./mocks/productsServices.mock');

describe('Checking product service', function () {
  describe('Product listing', function () {
    it('Returns the complete list of products', async function () {
      sinon.stub(productModel, 'findAll').resolves(productServiceMock.allProducts);
      
      const result = await productService.findAll();
      
      expect(result.message).to.deep.equal(productServiceMock.allProducts);
    });
  });
  describe('Search for a product', function () {
    afterEach(sinon.restore);
    it('Returns an error if it receives an invalid ID', async function () {
      const result = await productService.findById(0);
      
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('Returns an error if the product does not exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
     
      const result = await productService.findById(1);
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('Returns the product if existing ID', async function () {
      sinon.stub(productModel, 'findById').resolves(productServiceMock.allProducts[0]);
      
      const result = await productService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productServiceMock.allProducts[0]);
    });
  });
});