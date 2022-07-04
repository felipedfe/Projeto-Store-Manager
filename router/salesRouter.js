const express = require('express');
const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.get('/:id', SalesController.getSalesById);
router.get('/', SalesController.getSales);
router.post('/', SalesController.addSales);

module.exports = router;
