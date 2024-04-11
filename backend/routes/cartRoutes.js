const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define routes for cart-related operations
router.post('/add-to-cart', cartController.addToCart);
router.post('/remove-from-cart', cartController.removeFromCart);
router.get('/get-cart', cartController.getCart);
router.put('/update-quantity', cartController.updateQuantity);

module.exports = router;
