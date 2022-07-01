const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/ProductService');
const ProductController = require('../../../controllers/ProductController');
const dataMock = require('../../../__tests__/_dataMock');

const ID_EXAMPLE = 1;

describe('Busca por produtos (Camada Controller)', () => {
  describe('Busca por todos os produtos', () => {
    const response = {};
    const request = {};
    const testReturn = dataMock.allProductsResponse;
    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'getAll')
        .resolves(testReturn);
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it('Retorna todos os produtos e status 200', async () => {
      await ProductController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.send.calledWith(testReturn)).to.be.equal(true)
    })

  })

  describe('Busca um produto por um ID válido', () => {
    const response = {};
    const request = {};
    request.params = ID_EXAMPLE;
    const testReturn = dataMock.allProductsResponse[0];

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
      response.next = sinon.stub()
        .returns(response);

      sinon.stub(ProductService, 'getById')
        .resolves(testReturn);
    });

    after(() => {
      ProductService.getById.restore();
    });
    it('retorna o produto que contém o ID', async () => {
      await ProductController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(testReturn)).to.be.equal(true);
    })

    // it('Não encontra produto com ID válido', () => {
      
    // })
  })
})