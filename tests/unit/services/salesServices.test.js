const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModels');
const salesService = require('../../../src/services/salesService');
const salesServiceMock = require('./mocks/salesServices.mock');

describe('Checking sale service', function () {
  describe('Add new sale', function () {
    afterEach(sinon.restore);
    it('In product_sales, with success', async function () {
      sinon.stub(salesModel, 'insertSales').resolves(3);
      sinon.stub(productsModel, 'findById').resolves(true);
      sinon.stub(salesModel, 'insertSalesProduct').resolves();
      const result = await salesService.insertSales(salesServiceMock.newSale);
      expect(result).to.deep.equal({ type: null, message: 'sales successfully registered' })
    });
    it('In product_sales, with error', async function () {
      sinon.stub(salesModel, 'insertSales').resolves(3);
      sinon.stub(productsModel, 'findById').resolves(false);
      sinon.stub(salesModel, 'insertSalesProduct').resolves();
      const result = await salesService.insertSales(25);
      expect(result).to.deep.equal({ type: 'INVALID_ID', message: 'Product not found' })
    });
  });
});