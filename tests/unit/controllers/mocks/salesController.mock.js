const newSale = [
  {
    "productId": 1,
    "quantity": 1,
  },
  {
    "productId": 2,
    "quantity": 2,
  }
];

const withWrongId = [
  {
    "productId": "a",
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 2
  }
];

const withWrongQuant = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const salesList = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const updateSales = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];

module.exports = {
  newSale,
  withWrongId,
  withWrongQuant,
  salesList,
  updateSales,
};
