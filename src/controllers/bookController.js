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
  console.log(req.body);
  let booksWithYear = await BookModel.find({ year: publishedYear });
  res.send(booksWithYear);
};

//e.g if body had { name: “hi”} then you would fetch the books with this name
//
//if body had { year: 2020} then you would fetch the books in this year
const getParticularBooks = async function (req, res) {
  let filter = {};
  if (req.body.hasOwnProperty("bookName")) {
    let book = req.body.bookName;
    filter.bookName = book;
  } else if (req.body.hasOwnProperty("authorName")) {
    let author = req.body.authorName;
    filter.authorName = author;
  } else if (req.body.hasOwnProperty("tags")) {
    let tag = req.body.tags;
    filter.tags = tag;
  } else if (req.body.hasOwnProperty("totalPages")) {
    let page = req.body.totalPages;
    filter.totalPages = page;
  } else if (req.body.hasOwnProperty("year")) {
    let launchYear = req.body.year;
    filter.year = launchYear;
  } else if (req.body.hasOwnProperty("stockAvailable")) {
    let stock = req.body.stockAvailable;
    filter.stockAvailable = stock;
  }
  let particularBooks = await BookModel.find(filter);
  res.send(particularBooks);
  console.log(filter);
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
