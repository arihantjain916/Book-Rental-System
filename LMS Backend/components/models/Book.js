const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author Information"
    },
    description: {
        type: String,
        require: true
    },
    isbn: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    noofbooksavailable: {
        type: Number,
        default: 0,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        format: 'ISODate'
    },
});

const Book = mongoose.model(
    "Book Information",
    BookSchema
);
module.exports = Book;
