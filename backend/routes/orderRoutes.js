const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes for order-related operations
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;
