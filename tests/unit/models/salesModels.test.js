const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');
const salesModel = require('../../../src/models/salesModels');
const salesModelMock = require('./mocks/salesModel.mock');

describe('Sales model unit tests', function () {
  describe('Check if it adds', function () {
    afterEach(sinon.restore);

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
});
