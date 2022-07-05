const Joi = require('joi');
const SalesService = require('../services/SalesService');

// GET
const getSales = async (_req, res) => {
  const sales = await SalesService.getSales();
  return res.status(200).send(sales);
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await SalesService.getSalesById(id);

  if (sale.error) return next(sale.error);

  res.status(200).send(sale);
};

// POST
const addSales = async (req, res, next) => {
  const items = req.body;

  // aqui são checados os erros no corpo da requisição
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  })).validate(items);

  if (error) return next(error);

  // aqui é checado no BD se existe um produto com o productId passado na requisição
  const id = await SalesService.checkIds(items);

  if (id.error) return next(id.error);

  const sale = await SalesService.addSales(items);

  return res.status(201).json(sale);
};

// DELETE
const deleteSales = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesService.deleteSales(id);

  if (result.error) return next(result.error);

  return res.status(204).end();
};

module.exports = {
  getSales,
  addSales,
  deleteSales,
  getSalesById,
};
