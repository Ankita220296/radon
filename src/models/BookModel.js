const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    bookName: String,
    authorName: String,
    category: { type: String, enum: ["Drama", "Suspense", "Biography"] },
    year: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema); //books in to collection

// String, Number
// Boolean, Object/json, array
