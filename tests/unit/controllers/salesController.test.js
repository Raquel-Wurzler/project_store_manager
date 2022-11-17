const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const salesControllerMock = require('./mocks/salesController.mock');

describe('SalesController unit test', async function () {
  afterEach(sinon.restore);
  describe('Add new sale', async function () {
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
      const req = { body: salesControllerMock.withWrongId };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSales')
        .resolves({ type: 'ID_NOT_FOUND', message: 'Product not found' });

      await salesController.insertSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('With invalid quantity', async function () {
      const res = {};
      const req = { body: salesControllerMock.withWrongQuant };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertSales')
        .resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });

      await salesController.insertSales(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
  describe('Listing the sales', function () {
    it('Successfully listing the sales', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: salesControllerMock.salesList });

      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesControllerMock.salesList);
    });  
  });
  describe('Searching for a sale by id', function () {
    it('Successfully', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findById')
      .resolves({ type: null, message: salesControllerMock.newSale });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesControllerMock.newSale);
    });
    it('With error', async function () {
    const res = {};
    const req = {
      params: { id: 0 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith('Sale not found');
    });
  });
});