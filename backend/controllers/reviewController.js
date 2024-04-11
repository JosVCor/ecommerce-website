const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

// Review controller functions

// Add a review
exports.addReview = async (req, res) => {
    const { userId, productId, rating, comment } = req.body;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const newReview = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get reviews for a specific product
exports.getProductReviews = async (req, res) => {
    const productId = req.params.productId;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get reviews for the product
        const reviews = await Review.find({ product: productId });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
