const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//In this we check token is present or not / check token is verified or not / and also check authorization
const authMiddleware = async function (req, res, next) {
  let token = req.headers["x-Auth-token"] || req.headers["x-auth-token"];

  if (!token) res.send({ status: false, msg: "Token must be present" });

  try {
    let decodedtoken = jwt.verify(token, "functionup-radon");
    let userId = req.params.userId;
    let userLoggedIn = decodedtoken.userId;

    if (userId!= userLoggedIn)
      return res.send(
        "User logged in is not allowed to modified another users data"
      );

    let user = await userModel.findById(userId);
    if (!user) {
      return res.send("No such user exists");
    }
    req.user = user;
  } catch (error) {
    return res.send("The token is Invalid");
  }

  next();
};

module.exports.authMiddleware = authMiddleware;
