const mongoose = require('mongoose');

const Web = mongoose.model(
    "Web",
    new mongoose.Schema({
        _id: String,
        url: String,
        imgSource: String,
        title: String,
        description: String,
        category: Number,
        isFavorite: Boolean
    })
);

module.exports = Web;