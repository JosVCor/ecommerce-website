// Import the Product model
const Product = require('../models/productModel');
const mongoose = require("mongoose");

// Controller functions

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    console.log('Received Product ID:', productId)

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get product by category
exports.getProductsByCategory = async (req, res) => {
    let { category } = req.params;
    console.log('Received Category:', category)

    // Split the category string into an array of category IDs
    let categoryIds = [];
    // Check if the category parameter contains multiple categories (comma-separated)
    if (category.includes(',')) {
        // Split the category string into an array of category IDs
        categoryIds = category.split(',').map(id => new mongoose.Types.ObjectId(id.trim()));
    } else {
        // Convert single category ID string into an ObjectId and push it to the array
        categoryIds.push(new mongoose.Types.ObjectId(category.trim()));
    }

    try {
        console.log('Fetching products by category:', categoryIds);
        const products = await Product.find({ category: { $all: categoryIds } });
        console.log('Fetched products:', products);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Create a new product
exports.createProduct = async (req, res) => {
    const { name, price, countInStock, description } = req.body;
    console.log('Request File:', req.file)
    console.log('Request Body:', req.body)


    let image = null; // Default to null if no image is provided

    if (req.file) {
        // Single file upload
        image = req.file.filename;
    }

    const category = Array.isArray(req.body.category) ? req.body.category.filter(Boolean) : [req.body.category].filter(Boolean);
    const color = Array.isArray(req.body.color) ? req.body.color.filter(Boolean) : [req.body.color].filter(Boolean);
    const size = Array.isArray(req.body.size) ? req.body.size.filter(Boolean) : [req.body.size].filter(Boolean);
    console.log('New Product Data:', {
        name,
        image,
        price,
        category,
        countInStock,
        description,
        color,
        size
    });

    try {
        const newProduct = await Product.create({
            name,
            image,
            price,
            category,
            countInStock,
            description,
            color,
            size
        });
        console.log('New Product:', newProduct)
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        console.log('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { name, image, price, category, countInStock, description, color, size } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, image, price, category, countInStock, description, color, size },
            { new: true } // Return the updated document
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {category
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
