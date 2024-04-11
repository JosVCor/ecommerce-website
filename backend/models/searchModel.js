const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    query: { type: String, required: true },
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    timestamp: { type: Date, default: Date.now },
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
