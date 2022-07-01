const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/ProductModel');
const ProductService = require('../../../services/ProductService');
const dataMock = require('../../../__tests__/_dataMock');

const testReturn = dataMock.allProductsResponse;
describe('Busca por produtos (Camada Service)', () => { 
  describe('Busca por todos os produtos', () => {
    before( () => {
      sinon.stub(ProductModel, 'getAll').resolves(testReturn);
    });
    after( () => {
      ProductModel.getAll.restore();
    });

    it('retorna um array com todos os produtos',async () => {
      const products = await ProductService.getAll();
      expect(products).to.be.a('array');
      expect(products).to.be.deep.equal(testReturn);
    })
  })
});