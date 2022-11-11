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
   it('Listing the products', async function () {
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
  
  it('Searching for a product', async function () {
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

});
