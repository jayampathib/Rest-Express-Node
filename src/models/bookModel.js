const mongoose = require('mongoose');

// Deconstruct mongoose object
const { Schema } = mongoose;


// Create book Model
const bookModel = new Schema(
    {
        title: { type: String },
        genre: { type: String },
        author: { type: String },
        read: { type: Boolean }
    }
);

// add book model to Mongoose model object
module.exports = mongoose.model('Book',bookModel);