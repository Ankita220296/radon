const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, require: true },
    authorName: String,
    tags: [String],
    year: { type: Number, default: 2021 },
    totalPages: Number,
    prices: {
      indianPrice: String,
      europeanPrice: String,
    },
    stockAvailable: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookInfo", bookSchema); //bookinfos
