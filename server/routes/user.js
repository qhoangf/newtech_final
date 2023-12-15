// let route = require(".");
let userController = require("../controllers/userController");
let express = require('express');
let router = express.Router();
let hashMiddlewareController = require("../controllers/hashMiddlewareController");


router.post("/registerUser", userController.registerUser);

router.get("/getAllUser", hashMiddlewareController.verifyToken, userController.getAllUser);

router.post("/deleteUser/:id", hashMiddlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

router.post("/refreshToken", userController.requestRefreshToken);

router.get("/getUserInfo/:id", hashMiddlewareController.verifyToken, userController.getUserProfile);

router.post("/updateUser/:id", hashMiddlewareController.verifyToken, userController.updateUser);

router.post("/login", userController.loginUser);

router.post("/logout", hashMiddlewareController.verifyToken, userController.logOutUser)

module.exports = router;