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
      expect(result).to.deep.equal({ type: null, message: salesServiceMock.msgSucess })
    });
    it('In product_sales, with error id', async function () {
      sinon.stub(productsModel, 'findById').resolves(false);
      const result = await salesService.insertSales(salesServiceMock.withWrongId);
      expect(result.type).to.equal('ID_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
    it('In product_sales, with error quantity', async function () {
      const result = await salesService.insertSales(salesServiceMock.withWrongQuant);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });
  });
});