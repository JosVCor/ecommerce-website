const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes for product-related operations
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;