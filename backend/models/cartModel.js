const mongoose = require('mongoose');

// Create a schema for the cart item
const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, required: true },
});

// Create a schema for the cart
const cartSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
});

// Create a model for the cart
const Cart = mongoose.model('Cart', cartSchema);

// Export the model
module.exports = Cart;
