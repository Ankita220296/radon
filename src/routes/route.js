const express = require("express");
const logger = require("../logger/logger");
const helper = require("./../util/helper");
const formatter = require("./../validator/formatter");

const router = express.Router();

router.get("/test-me", function (req, res) {
  logger.welcome();
  helper.date();
  helper.month();
  helper.info();
  formatter.trim();
  formatter.uppercase();
  formatter.lowercase();

  res.send("My first ever api!");
});

module.exports = router;
// adding this comment for no reason
