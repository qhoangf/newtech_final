const userCon = require("../controllers/userCon");
const express = require("express");
const router = express.Router();

router.post("/register", userCon.register);
router.post("/login", userCon.login);
router.get("/getAll", userCon.getAll);
router.get("/getDetail", userCon.getDetail);
router.post("/checkAuthen", userCon.checkAuthen);
router.post("/logout", userCon.logout);
router.post("/update", userCon.update);

// router.post("/deconsteUser/:id", hashMiddlewareController.verifyTokenAndAdminAuth, userCon.deconsteUser);

// router.post("/refreshToken", userCon.requestRefreshToken);

// router.get("/getUserInfo/:id", hashMiddlewareController.verifyToken, userCon.getUserProfile);

// router.post("/updateUser/:id", hashMiddlewareController.verifyToken, userCon.updateUser);

module.exports = router;
