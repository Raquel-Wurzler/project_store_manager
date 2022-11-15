const productMock = {
  name: 'Martelo de Thor',
};

const newproductMock = { id: 1, ...productMock };

const productMockError = {
  name: 'Tor',
};

module.exports = {
  productMock,
  newproductMock,
  productMockError,
}