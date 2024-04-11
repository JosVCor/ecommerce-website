const mongoose = require('mongoose');

// Create a schema for the product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image:  { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color'}],
    size: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size'}],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Create a model for the product
const productModel = mongoose.model("Product", productSchema);

// Export the model
module.exports = productModel;



