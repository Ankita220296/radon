const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const userController = require("../controllers/usersController");
const productController = require("../controllers/productController");
const commonMW = require("../middlewares/commonMiddlewares");

router.post("/createProduct", productController.createProduct);

router.post(
  "/createUser",
  commonMW.headerMiddleware,
  userController.createUser
);

router.post(
  "/createOrder",
  commonMW.headerMiddleware,
  commonMW.bodyMiddleware,
  orderController.createOrder
);

router.get("/getorderDetails" ,orderController.getorderDetails)

module.exports = router;
