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
    "quantity": "t"
  },
  {
    "productId": 2,
    "quantity": 0
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
]

module.exports = {
  newSale,
  msgSucess,
  withWrongId,
  withWrongQuant,
  salesList,
};
