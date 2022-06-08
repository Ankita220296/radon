const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const authorController = require("../controllers/authorController");
const BookController = require("../controllers/bookController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createAuthor", authorController.createAuthor);

router.post("/createBook", BookController.createBook);

router.get("/getBooksData", BookController.getBooksData);

router.get("/getAuthorId", authorController.getAuthorId);

router.get("/getAuthorAndUpdate", BookController.getAuthorAndUpdate);

router.get("/getBookWithPrice", authorController.getBookWithPrice);

router.get("/getAuthors", authorController.getAuthors);

router.get("/getBooksByAuthorId/:num", BookController.getBooksByAuthorId);

module.exports = router;
