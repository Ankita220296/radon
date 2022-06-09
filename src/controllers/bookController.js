const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const createBook = async function (req, res) {
  let data = req.body;

  if (!data.author) res.send("Author Id is mandatory");
  let author = await authorModel.findById(data.author);
  if (!author) res.send("Enter Author Id is not valid");

  if (!data.publisher) res.send("Publisher Id is mandatory");
  let publisher = await publisherModel.findById(data.publisher);
  if (!publisher) res.send("Enter A Publisher Id is not valid");

  let bookCreated = await bookModel.create(data);
  res.send(bookCreated);
};

const getBooksWithAuthorDetails = async function (req, res) {
  let specificBook = await bookModel
    .find()
    .populate("author")
    .populate("publisher");
  res.send({ data: specificBook });
};

const getBooksbyPublishers = async function (req, res) {
  let publisher = await publisherModel.find({name : {$in :[ "Penguin" ,"HarperCollins"]}}).select({_id:1});
  let x = publisher.map((ele)=>ele._id)
  let book = await bookModel.find({publisher: {$in : x}}).update({$set : {isHardCover : true}})
  let result = await bookModel.find({isHardCover : true}).populate(['author','publisher'])
  res.send(result)

};

const getAuthorsWithRatings = async function (req, res) {
  let authors = await authorModel.find({rating : {$gt :3.5}}).select({_id:1});
  let x = authors.map((ele)=>ele._id)
  let book = await bookModel.updateMany({author : {$in : x}},{$set : {$inc :{ price :10}}})
  let result = await bookModel.find({author : {$in : x}}).populate('author')
  res.send(result)

};

module.exports.createBook = createBook;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.getBooksbyPublishers = getBooksbyPublishers;
module.exports.getAuthorsWithRatings = getAuthorsWithRatings;
