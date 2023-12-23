const userCon = require("../controllers/userCon");
const express = require("express");
const router = express.Router();

router.post("/register", userCon.register);
router.post("/login", userCon.login);
router.post("/getAll", userCon.getAll);
router.post("/getDetail", userCon.getDetail);
router.get("/checkAuthen", userCon.checkAuthen);
router.get("/logout", userCon.logout);
router.post("/update", userCon.update);
router.post("/delete", userCon.delete);

// router.post("/deconsteUser/:id", hashMiddlewareController.verifyTokenAndAdminAuth, userCon.deconsteUser);

// router.post("/refreshToken", userCon.requestRefreshToken);

// router.get("/getUserInfo/:id", hashMiddlewareController.verifyToken, userCon.getUserProfile);

// router.post("/updateUser/:id", hashMiddlewareController.verifyToken, userCon.updateUser);

module.exports = router;
