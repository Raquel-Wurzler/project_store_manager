const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const productsControllerMock = require('./mocks/productsController.mock');

describe('ProductController unit test', function () {
  afterEach(sinon.restore);
  describe('Listing the products', function () {
    it('Successfully listing the products', async function () {
      const res = {};
      const req = {};
      const productList = [productsControllerMock.newproductMock];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: productList });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });  
  });
  describe('Searching for a product by id', function () {
    it('Successfully', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findById')
      .resolves({ type: null, message: productsControllerMock.newproductMock });

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsControllerMock.newproductMock);
    });
    it('With error', async function () {
    const res = {};
    const req = {
      params: { id: 0 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findById')
      .resolves({ type: 'ID_NOT_FOUND', message: 'Product not found' });

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith('Product not found');
    });
  });
  describe('Registering a new product', function () {
    it('Successfully', async function () {
      const res = {};
      const req = {
        body: productsControllerMock.productMock,
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProducts')
        .resolves({ type: null, message: productsControllerMock.newproductMock });
  
      await productsController.createProducts(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productsControllerMock.newproductMock);
    });
    it('With error', async function () {
      const res = {};
      const req = {
        body: productsControllerMock.productMockError,
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProducts')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
  
      await productsController.createProducts(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });
  describe('Update a product', function () {
    it('Successfully', async function () {
      const res = {};
      const req = { body: { name: 'Alfredo' }, params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: null, message: { id: 1, name: 'Alfredo' } });
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Alfredo' });
    });
    it('With error', async function () {
      const res = {};
      const req = { body: { name: 'Alfredo' }, params: { id: 0 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Delete a product', function () {
    it('Successfully', async function () {
      const res = {};
      const req = { params: { id: 1 }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: null, message: { id: 1 } });
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
    it('With error', async function () {
      const res = {};
      const req = { params: { id: 0 }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});


