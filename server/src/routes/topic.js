const topicCon = require("../controllers/topicCon");
const express = require("express");
const router = express.Router();

router.post("/create", topicCon.create);
router.post("/enroll", topicCon.enroll);
router.get("/getAll", topicCon.getAll);
router.get("/getDetail", topicCon.getDetail);
router.post("/update", topicCon.update);

module.exports = router;
