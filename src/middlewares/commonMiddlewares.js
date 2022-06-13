const createUser = require("../controllers/usersController");
const orderModel = require("../models/orderModel");

const headerMiddleware = function (req, res, next) {
  const isFreeAppUser = req.headers.isfreeappuser;
  if (isFreeAppUser === undefined) {
    res.send("Header freeAppUser is mandatory");
  } else {
    req.isFreeAppUser = isFreeAppUser;
    next();
  }
};

const bodyMiddleware = function (req, res, next) {
  const data = req.body;
  if (!data.userId) {
    res.send("User Id is mandatory");
  } else if (!data.productId) {
    res.send("Product Id is mandatory");
  } else {
    next();
  }
};

module.exports.headerMiddleware = headerMiddleware;
module.exports.bodyMiddleware = bodyMiddleware;
