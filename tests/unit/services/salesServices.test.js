const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModels');
const salesService = require('../../../src/services/salesService');
const salesServiceMock = require('./mocks/salesServices.mock');

describe('Checking sale service', function () {
  afterEach(sinon.restore);
  describe('Add new sale', function () {
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
  describe('Sales listing', function () {
    it('Returns the complete list of sales', async function () {
      sinon.stub(salesModel, 'findAll').resolves(salesServiceMock.salesList);
      const result = await salesService.findAll();
      expect(result.message).to.deep.equal(salesServiceMock.salesList);
    });
  });
  describe('Search for a sale by Id', function () {
    it('Returns the sale if existing ID', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesServiceMock.salesList[0]);
      const result = await salesService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesServiceMock.salesList[0]);
    });
    it('Returns an error if it receives an invalid ID', async function () {
      const result = await salesService.findById(0);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    it('Returns an error if the sale does not exist', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const result = await salesService.findById(1);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal({ message: 'Sale not found' });
      expect(result.message instanceof Object).to.equal(true);
    });
  });
  describe('Deleting a sales by Id', function () {
    it('Successfully', async function () {
      sinon.stub(salesModel, 'deleteSales').resolves({ affectedRows: 1 });
      const result = await salesService.deleteSales(2);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 2 });
    });
    it('With error', async function () {
      sinon.stub(salesModel, 'deleteSales').resolves({ affectedRows: 0 });
      const result = await salesService.deleteSales(0);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });
  describe('Update a sale by Id', function () {
    it('Successfully', async function () {
      sinon.stub(salesModel, 'updateSales').resolves({ affectedRows: 1 });
      const result = await salesService.updateSales(2, salesServiceMock.updateSale);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ saleId: 2, itemsUpdated: salesServiceMock.updateSale });
    });
    it('With error by saleId', async function () {
      sinon.stub(salesService, 'findById').resolves({ affectedRows: 0 });
      const result = await salesService.updateSales(1000, salesServiceMock.updateSale);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
    it('With error by quantity', async function () {
      sinon.stub(salesModel, 'updateSales').resolves({ affectedRows: 0 });
      const result = await salesService.updateSales(1, salesServiceMock.withWrongQuant);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });
    it('With error by productId', async function () {
      sinon.stub(salesModel, 'updateSales').resolves({ affectedRows: 0 });
      const result = await salesService.updateSales(1, salesServiceMock.withWrongId);
      expect(result.type).to.equal('ID_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });
});