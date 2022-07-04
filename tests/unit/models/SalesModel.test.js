const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');
const dataMock = require('../../../__tests__/_dataMock');

const ID = 1;
const INVALID_ID = 'a';
const getSalesReturn = [
  {
    "saleId": 1,
    "date": "2022-07-04T15:51:45.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-07-04T15:51:45.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-07-04T15:51:45.000Z",
    "productId": 3,
    "quantity": 15
  }
];

describe('Busca por vendas (Camada Model)', () => {
  describe('Busca por todas as vendas', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([getSalesReturn]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array com todas as vendas', async () => {
      const sales = await SalesModel.getSales();

      expect(sales).to.be.a('array');
      expect(sales[0]).to.have.property('saleId' && 'date' && 'productId' && 'quantity')
    })
  })

  describe('Busca venda por um ID válido', () => {
    // before(async () => {
    //   sinon.stub(connection, 'execute').resolves([getSalesReturn[0]]);
    // });
    // after(async () => {
    //   connection.execute.restore();
    // });
    it('')
  })

})