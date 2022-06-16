const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const middleware = require("../middlewares/auth");

//Create a user
const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData });
    } else {
      res.status(400).send({ msg: "Invalid data" });
    }
  } catch (err) {
    res.status(500).send({ msg: "This is Error", Error: err.massage });
  }
};

//When logging user the token generated through Jsonwebtoken
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
  try {
    if (!userName && !password) {
      res.status(400).send({ msg: "UserName and Password are mandatory" });
    }else if (userName == undefined || password == undefined){
        res.status(400).send({ msg: "UserName and Password are mandatory" });
    }
    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!user)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not correct",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "Radon",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
  } catch (err) {
    res.status(500).send({ msg: "This is Error", Error: err.massage });
  }
};

//Get all users data with verifed token in middleware
const getUserData = async function (req, res) {
  try {
    let userDetails = req.user;
    if (!userDetails)
      return res
        .status(400)
        .send({ status: false, msg: "No such user exists" });
    res.status(201).send({ status: true, data: userDetails });
  } catch (err) {
    res.status(500).send({ msg: "This is Error", Error: err.massage });
  }
};

//Gives all updated data with verifed token in middleware
const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userData = req.user;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.status(200).send({ status: updatedUser, data: updatedUser });
  } catch (err) {
    res.status(500).send({ msg: "This is Error", Error: err.massage });
  }
};

//update one attribute and verifed token in middleware
const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findOneAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true }
    );
    res.status(201).send({ userDetails });
  } catch (err) {
    res.status(500).send({ msg: "This is Error", Error: err.massage });
  }
};

//Add value into new attribute and verifed token in middleware
const postMassage = async function (req, res) {
  try {
    let message = req.body.message;
    let user = req.user;
    let updatedPost = user.posts;
    updatedPost.push(message);
    if (!message) {
      res.status(400).send({ msg: "Message is compulsary" });
    }
    let updatatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { posts: updatedPost },
      { new: true }
    );
    res.status(200).send(updatatedUser);
  } catch (err) {
    res.status(500).send({ msg: "This is Error", Error: err.massage });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMassage = postMassage;
