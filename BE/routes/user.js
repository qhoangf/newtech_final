// let route = require(".");
let userController = require("../controllers/userController");
let express = require('express');
let router = express.Router();
let hashMiddlewareController = require("../controllers/hashMiddlewareController");


router.post("/register",userController.registerUser);

router.post("/login",userController.loginUser);

router.get("/getall",hashMiddlewareController.verifyToken,userController.getAllUser);

router.delete("/delete/:id",hashMiddlewareController.verifyTokenAndAdminAuth,userController.deleteUser);

router.post("/refresh",userController.requestRefreshToken);

router.get("/profile/:id",hashMiddlewareController.verifyToken,userController.getUserProfile);

router.put("/update/:id",hashMiddlewareController.verifyToken,userController.updateUser);

router.post("/logout",hashMiddlewareController.verifyToken,userController.logOutUser)

module.exports = router;