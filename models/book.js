const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        author: String,
        rating: Number
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book; 