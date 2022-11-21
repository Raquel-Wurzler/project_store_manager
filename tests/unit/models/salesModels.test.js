const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesModel = require('../../../src/models/salesModels');
const salesModelMock = require('./mocks/salesModel.mock');

describe('Sales model unit tests', function () {
  afterEach(sinon.restore);
  describe('Check if it adds', function () {
    it('In the sales table', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const result = await salesModel.insertSales();
      expect(result).to.be.deep.equal(3);
    });
    it('In the sales_products table', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const saleId = await salesModel.insertSales();
      const result = await salesModel.insertSalesProduct(salesModelMock.newSale[0], saleId);
      expect(result).to.equal(3);
    });
  });
  describe('Check if it list sales', function () {
    it('Retrieving the sales list', async function () {
      sinon.stub(connection, 'execute').resolves([salesModelMock.salesFromDb]);
      const result = await salesModel.findAll();
      expect(result).to.be.deep.equal(salesModelMock.salesFromDb);
    });
  });
  describe('Check if listing a sales by id', function () {
    it('Succesfuly', async function () {
    sinon.stub(connection, 'execute').resolves([salesModelMock.salesFromDbById]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(salesModelMock.salesFromDbById);
    });
  });
    describe('Delete sales', function () {
    it('Delete sales successfully', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.deleteSales(1);
      expect(result.affectedRows).to.equal(1);
    });
  });
  describe('Update sales', function () {
    it('Update sales successfully', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.updateSales(1);
      expect(result.affectedRows).to.equal(1);
    });
  });
});
