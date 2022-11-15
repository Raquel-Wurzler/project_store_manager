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

const msgSucess = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 2
    }
  ]
}

const withWrongId = [
  {
    "productId": "t",
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
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 0
  }
];

module.exports = {
  newSale,
  msgSucess,
  withWrongId,
  withWrongQuant,
};
