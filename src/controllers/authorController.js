const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");

//Write create APIs for both books and authors
const createAuthor = async function (req, res) {
  let data = req.body;
  let savedData = await authorModel.create(data);
  res.send({ msg: savedData });
};

//Write get data APIs for both books and authors
const getAuthorsData = async function (req, res) {
  let allAuthors = await authorModel.find();
  res.send({ msg: allAuthors });
};

//List out the books written by "Chetan Bhagat"
const getAuthorId = async function (req, res) {
  let author = await authorModel.findOne({ author_name: "Chetan Bhagat" });
  let id = author.author_id;
  let book = await bookModel.find({author_id :id});
  res.send(book);
};

//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books..

const getBookWithPrice = async function (req, res) {
  let books = await bookModel
    .find({ price: { $gte: 50, $lte: 100 } })
    .select({ author_id: 1 });

  books = books.map((book) => book.author_id);
  const authors = await authorModel.find({ author_id: { $in: books } });
  let authorName = authors.map((name) => name.author_name);
  res.send(authorName);
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthorsData = getAuthorsData;
module.exports.getAuthorId = getAuthorId;
module.exports.getBookWithPrice = getBookWithPrice;
