// const { count } = require("console");
const BookModel = require("../models/bookModel");
// const { all } = require("../routes/route");

// to create a new entry..use this api to create 11+ entries in your collection
const createBook = async function (req, res) {
  let data = req.body;

  let savedData = await BookModel.create(data);
  res.send({ msg: savedData });
};

const getBooksData = async function (req, res) {
  // gives all the books- their bookName and authorName only
  let allBooks = await BookModel.find().select({
    bookName: 1,
    authorName: 1,
    _id: 0,
  });
  res.send({ msg: allBooks });
};

//takes year as input in post request and gives list of all books published that year
const getBooksInYear = async function (req, res) {
  let publishedYear = req.body.year;
  let booksWithYear = await BookModel.find({ year: publishedYear });
  res.send(booksWithYear);
};

//e.g if body had { name: “hi”} then you would fetch the books with this name
//
//if body had { year: 2020} then you would fetch the books in this year
const getParticularBooks = async function (req, res) {
  let filter = {};
  const {
    bookName,
    authorName,
    tags,
    totalPages,
    year,
    stockAvailable,
    prices,
  } = req.body;
  if (bookName) {
    filter.bookName = book;
  }
  if (authorName) {
    filter.authorName = author;
  }
  if (tags != undefined) {
    filter.tags = { $in: tags };
  }
  if (totalPages) {
    filter.totalPages = page;
  }
  if (year) {
    filter.year = launchYear;
  }
  if (stockAvailable) {
    filter.stockAvailable = stock;
  }
  if (prices != undefined) {
    if (prices.indianPrice != undefined)
      filter["prices.indianPrice"] = prices.indianPrice;
    if (prices.europePrice != undefined)
      filter["prices.europePrice"] = prices.europePrice;
  }
  let particularBooks = await BookModel.find(filter);
  res.send(particularBooks);
};

//request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
const getXINRBooks = async function (req, res) {
  let getINRBooks = await BookModel.find({
    "prices.indianPrice": { $in: ["100INR", "200INR", "500INR"] },
  });
  res.send(getINRBooks);
};

// returns books that are available in stock or have more than 500 pages

const getRandomBooks = async function (req, res) {
  let allRandomBooks = await BookModel.find({
    $or: [{ stockAvailable: true }, { totalPages: { $gt: 500 } }],
  });
  res.send(allRandomBooks);
};

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;
module.exports.getParticularBooks = getParticularBooks;
