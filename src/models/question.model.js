const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    _id: String,
    title: String,
    content: String,
    date: String,

    authorId: String,
    view: Number
});

const Question = mongoose.model("question", scheme);

module.exports = Question;
