const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/productsModel');
const connection = require('../../../src/db/connection');
const productModelMock = require('./mocks/productsModels.mock');

describe('Product model unit tests', function () {
  afterEach(sinon.restore);
  describe('Product list', function () {
    it('Retrieving the product list', async function () {
      sinon.stub(connection, 'execute').resolves([productModelMock.productsFromDb]);
      const result = await productModel.findAll();
      expect(result).to.be.deep.equal(productModelMock.productsFromDb);
    });
  });
  describe('Product by Id', function () {
    it('Retrieving a product from its id', async function () {
      sinon.stub(connection, 'execute').resolves([[productModelMock.productsFromDb[0]]]);
      const result = await productModel.findById(1);
      expect(result).to.be.deep.equal(productModelMock.productsFromDb[0]);
    });
  });
  describe('New product', function () {
    it('Registering a new product', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 6 }]);
      const result = await productModel.insert(productModelMock.newProduct);
      expect(result).to.equal(6);
    });
  });
  describe('Update product', function () {
    it('Update product successfully', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productModel.updateProduct(1);
      expect(result.affectedRows).to.equal(1);
    });
  });
  describe('Delete product', function () {
    it('Delete product successfully', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productModel.deleteProduct(1);
      expect(result.affectedRows).to.equal(1);
    });
  });
  describe('Search product', function () {
    it('Successfully', async function () {
      sinon.stub(connection, 'execute').resolves(productModelMock.searchProducts);
      const result = await productModel.searchProducts('Martelo');
      expect(result).to.deep.equal(productModelMock.searchProducts[0]);
    });
  });
});
