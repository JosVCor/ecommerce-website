const Cart = require('../models/cartModel');

// Cart controller functions

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne();

        if (!cart) {
            // If there's no cart yet, create a new one
            cart = await Cart.create({ items: [] });
        }

        // Check if the product is already in the cart
        const existingItem = cart.items.find(item => item.productId.equals(productId));

        if (existingItem) {
            // If the product is already in the cart, update the quantity
            existingItem.quantity += quantity;
        } else {
            // If the product is not in the cart, add a new item
            cart.items.push({ productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        await Cart.updateOne(
            {},
            { $pull: { items: { productId } } }
        );

        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateQuantity = async (req, res) => {
    const { productId, newQuantity } = req.body;

    try {
        const cart = await Cart.findOne();  // Assuming there is only one cart

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.productId.toString() === productId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        cartItem.quantity = newQuantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
