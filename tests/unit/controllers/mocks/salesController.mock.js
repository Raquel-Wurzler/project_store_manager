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
]

module.exports = {
  newSale,
  withWrongId,
  withWrongQuant,
};
