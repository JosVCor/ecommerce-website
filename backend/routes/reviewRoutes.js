const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Define routes for review-related operations

// Add a review
router.post('/', reviewController.addReview);

// Get reviews for a specific product
router.get('/product/:productId', reviewController.getProductReviews);

module.exports = router;
