const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/ProductModel');
const ProductService = require('../../../services/ProductService');
const dataMock = require('../../../__tests__/_dataMock');

const ID_EXAMPLE = 1;
const INVALID_ID = 'a';

describe('Busca por produtos (Camada Service)', () => { 
  describe('Busca por todos os produtos', () => {
    const testReturn = dataMock.allProductsResponse;
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

  describe('Busca um produto por um ID válido', () => {
    const testReturn = dataMock.allProductsResponse[0];
    before(() => {
      sinon.stub(ProductModel, 'getById').resolves(testReturn);
    });
    after(() => {
      ProductModel.getById.restore();
    });

    it('retorna o produto que contém o ID',async () => {
      const products = await ProductService.getById(ID_EXAMPLE);

      expect(products).to.be.a('object');
      expect(products).to.have.own.property('id');
      expect(products).to.have.own.property('name');

    })
  })

  describe('Busca um produto por um ID inválido', () => {
    before(() => {
      sinon.stub(ProductModel, 'getById').resolves(null);
    });
    after(() => {
      ProductModel.getById.restore();
    });

    it('retorna um erro com a mensagem "notFound"', async () => {
      const products = await ProductService.getById(INVALID_ID);

      expect(products.error.code).to.equal('notFound');
    })
  })
});