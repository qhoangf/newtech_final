const topicCon = require("../controllers/topicCon");
const express = require("express");
const router = express.Router();

router.post("/create", topicCon.create);
router.post("/enroll", topicCon.enroll);
router.get("/getAll", topicCon.getAll);
router.post("/getDetail", topicCon.getDetail);
router.post("/update", topicCon.update);
router.post("/approve", topicCon.approve);
router.post("/delete", topicCon.delete);
router.post("/teacherAssign", topicCon.teacherAssign);

module.exports = router;
