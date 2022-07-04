const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.getAll);
router.post('/', ProductController.addProduct);

module.exports = router;
