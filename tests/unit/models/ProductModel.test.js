const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductModel = require('../../../models/ProductModel');
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

describe('Busca por produtos (Camada Model)', () => {
  describe('Busca por todos os produtos', () => {
    before(() => {
      const testReturn = dataMock.allProductsResponse;
      sinon.stub(connection, 'execute').resolves([testReturn]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array com todos os produtos', async () => {

      const products = await ProductModel.getAll();
      expect(products).to.be.a('array');
    })
  })

  describe('Busca um produto por um ID válido', () => {
    before(() => {
      const testReturn = dataMock.allProductsResponse[0];
      sinon.stub(connection, 'execute').resolves([[testReturn]]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna o produto que contém o ID', async () => {
      const product = await ProductModel.getById(ID);

      expect(product).to.be.a('object');
      expect(product.id).to.equal(ID);
    })
  })

  describe('Busca um produto por um ID inválido', () => {
    before(() => {
      const testReturn = [];
      sinon.stub(connection, 'execute').resolves([testReturn]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Retorna o valor null', async () => {
      const product = await ProductModel.getById(INVALID_ID);
      expect(product).to.equal(null);
    })
  })
})

describe('Adiciona produtos (Camada Model)', () => {
  describe('Adiciona produto com sucesso', () => {
    before( () => {
      // const testReturn = dataMock.productCreateResponse;
      sinon.stub(connection, 'execute').resolves([{insertId: ID}]);
      // console.log(testReturn)
    });
    after( () => {
      connection.execute.restore();
    });

    it('Retorna um objeto com ID e NOME do produto', async () => {
      const body = dataMock.rightProductBody;
      const product = await ProductModel.addProduct(body.name);

      expect(product).to.be.a('object');
      expect(product).to.have.property('id').to.be.a('number');
      expect(product).to.have.property('name').to.be.a('string');
    })
  })

})