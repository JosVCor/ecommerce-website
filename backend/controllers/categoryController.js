const Category = require('../models/categoryModel'); // Adjust the path accordingly

const categoryController = {
    // Create a new category
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const newCategory = new Category({ name });
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get a single category by ID
    getCategoryById: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update a category by ID
    updateCategoryById: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { name } = req.body;
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                { name },
                { new: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Delete a category by ID
    deleteCategoryById: async (req, res) => {
        try {
            const { id: categoryId } = req.params;

            if (!categoryId) {
                console.log('Invalid categoryId:', categoryId);
                console.log('Full req.params:', req.params); // Log the entire params object
                return res.status(400).json({ error: 'Invalid categoryId' });
            }

            console.log('Received categoryId:', categoryId);

            const deletedCategory = await Category.findByIdAndDelete(categoryId);

            if (!deletedCategory) {
                console.log('Category not found for deletion.');
                return res.status(404).json({ error: 'Category not found' });
            }

            console.log('Category deleted successfully.');
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = categoryController;