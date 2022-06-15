const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const headerMiddle = async function (req, res, next) {
  let token = req.headers["x-Auth-token"] || req.headers["x-auth-token"];

  if (!token) res.send({ status: false, msg: "Token must be present" });

  try {
    let decodedtoken = jwt.verify(token, "functionup-radon");
  } catch (error) {
    return res.send("The token is Invalid");
  }

  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }

  next();
};

module.exports.headerMiddle = headerMiddle;
