const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//In this we check token is present or not / check token is verified or not / and also check authorization
const authMiddleware = async function (req, res, next) {
  let token = req.headers["x-Auth-token"] || req.headers["x-auth-token"];

  if (!token)
    res.status(400).send({ status: false, msg: "Token must be present" });

  try {
    let decodedtoken = jwt.verify(token, "functionup-radon");

    try {
      let userId = req.params.userId;
      let userLoggedIn = decodedtoken.userId;

      if (userId != userLoggedIn)
        return res
          .status(403)
          .send("User logged in is not allowed to modified another users data");

      let user = await userModel.findById(userId);
      if (!user) {
        return res.status(401).send("No such user exists");
      }
      req.user = user;
    } catch (err) {
      res.status(500).send({ msg: "This is Error", Error: err.massage });
    }
  } catch (err) {
    return res.status(403).send("Token is invalid");
  }

  next();
};

module.exports.authMiddleware = authMiddleware;
