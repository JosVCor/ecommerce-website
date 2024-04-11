const Color = require('../models/colorModel');

const colorController = {
    createColor: async (req, res) => {
        const { name, hexCode } = req.body;

        try {
            const newColor = await Color.create({ name, hexCode });
            res.status(201).json(newColor);
        } catch (error) {
            console.error('Error creating color:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

// Retrieve colors with their hex codes
    getAllColors: async (req, res) => {
        try {
            const colors = await Color.find({}, 'name hexCode'); // Only retrieve name and hexCode
            res.json(colors);
        } catch (error) {
            console.error('Error fetching colors:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = colorController;
