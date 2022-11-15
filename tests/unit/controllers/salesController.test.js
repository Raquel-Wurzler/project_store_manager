const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const salesControllerMock = require('./mocks/salesController.mock');

describe('SalesController unit test', async function () {
  describe('Add new sale', async function () {
    afterEach(sinon.restore);

    it('With success', async function () {
      const res = {};
      const req = { body: salesControllerMock.newSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSales')
        .resolves({ type: null, message: 'sales successfully registered' });

      await salesController.insertSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith('sales successfully registered');
    });
        it('With invalid id', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSales')
        .resolves({ type: 'INVALID_ID', message: 'Product not found' });

      await salesController.insertSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Product not found');
    });
  });
});