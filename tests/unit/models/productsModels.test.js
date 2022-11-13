const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/productsModel');
const connection = require('../../../src/db/connection');
const productModelMock = require('./mocks/productsModels.mock');

describe('Product model unit tests', function () {
  afterEach(sinon.restore);

  it('Retrieving the product list', async function () {
    sinon.stub(connection, 'execute').resolves([productModelMock.productsFromDb]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(productModelMock.productsFromDb);
  });

  it('Retrieving a product from its id', async function () {
    sinon.stub(connection, 'execute').resolves([[productModelMock.productsFromDb[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(productModelMock.productsFromDb[0]);
  });

  it('Registering a new product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 6 }]);
    const result = await productModel.insert(productModelMock.newProduct);
    expect(result).to.equal(6);
  });
});
