const productMock = {
  name: 'Martelo de Thor',
};

const newproductMock = { id: 1, ...productMock };

const productMockError = {
  name: 'Tor',
};

const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: "Máscara do Homem de Ferro"
  }
];

const searchQuery = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

module.exports = {
  productMock,
  newproductMock,
  productMockError,
  allProducts,
  searchQuery,
}