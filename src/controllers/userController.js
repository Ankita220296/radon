const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const middleware = require("../middlewares/auth")

//Create a user
const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

//When logging user the token generated through Jsonwebtoken
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
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
  res.send({ status: true, token: token });
};

//Get all users data with verifed token in middleware
const getUserData = async function (req, res) {
  let userDetails = req.user
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  res.send({ status: true, data: userDetails });
};

//Gives all updated data with verifed token in middleware
const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let userData = req.user;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new :true});
  res.send({ status: updatedUser, data: updatedUser });
};
 
//update one attribute and verifed token in middleware
const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findOneAndUpdate(
    { _id: userId },
    { isDeleted: true } ,{new :true} 
  );
  res.send({ userDetails });
};
 
//Add value into new attribute and verifed token in middleware
const postMassage = async function (req,res){
    let massage = req.body.massage
    let user = req.user
    let updatedPost = user.posts
    updatedPost.push(massage)

    let updatatedUser = await userModel.findOneAndUpdate({_id : user._id},{posts : updatedPost},{new : true})
    res.send(updatatedUser)
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMassage = postMassage;
