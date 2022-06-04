const express = require("express");
const router = express.Router();
const BookModel = require("../models/BookModel.js");
const BookController = require("../controllers/BookController");
const res = require("express/lib/response");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/createBookInfo", BookController.createBookInfo);

router.get("/getBooksData", BookController.getBooksData);

module.exports = router;
