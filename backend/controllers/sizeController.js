const Size = require('../models/sizeModel');
const Category = require("../models/categoryModel");

const sizeController = {
    getAllSizes: async (req, res) => {
        try {
            const sizes = await Size.find();
            res.json(sizes);
        } catch (error) {
            console.error('Error fetching sizes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    createSize: async (req, res) => {
        try {
            const { name } = req.body;
            const newSize = new Size({ name });
            await newSize.save();
            res.status(201).json(newSize);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = sizeController;
