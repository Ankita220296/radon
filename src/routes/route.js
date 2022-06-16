const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middlewares/auth");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/users", userController.createUser);

router.post("/login", userController.loginUser);

//The userId is sent by front end
router.get(
  "/users/:userId",
  middleware.authMiddleware,
  userController.getUserData
);

router.put(
  "/users/:userId",
  middleware.authMiddleware,
  userController.updateUser
);

router.delete(
  "/users/:userId",
  middleware.authMiddleware,
  userController.deleteUser
);

router.post(
  "/users/:userId/posts",
  middleware.authMiddleware,
  userController.postMassage
);

module.exports = router;
