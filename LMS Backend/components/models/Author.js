const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book Information"
    }],
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const Author = mongoose.model(
    "Author Information",
    AuthorSchema
);
module.exports = Author;
