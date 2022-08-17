const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");

//Write create APIs for both books and authors
const createAuthor = async function (req, res) {
  let data = req.body;
  let authorId = data.author_id;
  if (!authorId) res.send({ msg: "Author Id is mandatory" });
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
  let book = await bookModel.find({ author_id: id });
  res.send(book);
};

//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books..

const getBookWithPrice = async function (req, res) {
  let books = await bookModel
    .find({ price: { $gte: 50, $lte: 100 } })
    .select({ author_id: 1, _id: 0 });

 
  books = books.map((book) => book.author_id);
 
  const authors = await authorModel
    .find({ author_id: { $in: books } })
    .select({ author_name: 1, _id: 0 });

  res.send({ authors });
};

//Find a list of authors whose are older than 50 years of age with at least one book that has a rating greater than 4

const getAuthors = async function (req, res) {
  let author = await authorModel
    .find({ age: { $gt: 50 } })
    .select({ author_name: 1, age: 1, _id: 0, author_id: 1 });
  const ids = author.map((ele) => ele.author_id);

  let book = await bookModel
    .find({ ratings: { $gt: 4 }, author_id: { $in: ids } })
    .select({ _id: 0 });

  book = book.map((ele) => ele.author_id);
  author = author.filter((ele) => book.includes(ele.author_id)).map((ele)=>{return{author_name : ele.author_name , age :ele.age}});
    res.send(author);
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthorsData = getAuthorsData;
module.exports.getAuthorId = getAuthorId;
module.exports.getBookWithPrice = getBookWithPrice;
module.exports.getAuthors = getAuthors;
