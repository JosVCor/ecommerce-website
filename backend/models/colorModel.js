const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    hexCode: { type: String, required: true },
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
