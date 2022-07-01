const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductModel = require('../../../models/ProductModel');
const dataMock = require('../../../__tests__/_dataMock');

const ID = 1;
const INVALID_ID = 'a';

describe('Busca por produtos (Camada Model)', () => {
  // after(async () => {
  //   connection.execute.restore();
  // });
  describe('Busca por todos os produtos', () => {
    before(async () => {
      const testReturn = dataMock.allProductsResponse;
      sinon.stub(connection, 'execute').resolves([testReturn]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retorna um array com todos os produtos', async () => {

      const products = await ProductModel.getAll();
      // console.log('----', products)
      expect(products).to.be.a('array');
    })
  })

  describe('Busca um produto por um ID válido', () => {
    before(async () => {
      const testReturn = dataMock.allProductsResponse[0];
      sinon.stub(connection, 'execute').resolves([[testReturn]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retorna o produto que contém o ID', async () => {
      const product = await ProductModel.getById(ID);
      // console.log('product>>> ', product)

      expect(product).to.be.a('object');
      expect(product.id).to.equal(ID);
    })
  })

  describe('Busca um produto por um ID inválido', () => {
    before(async () => {
      const testReturn = [];
      sinon.stub(connection, 'execute').resolves([testReturn]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna o valor null', async () => {
      const product = await ProductModel.getById(INVALID_ID);
      expect(product).to.equal(null);
    })
  })
})

