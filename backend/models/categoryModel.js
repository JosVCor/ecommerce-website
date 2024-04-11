const mongoose = require('mongoose');

// Create a schema for the category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

// Create a model for the category
const categoryModel = mongoose.model("Category", categorySchema);

// Export the model
module.exports = categoryModel;



