const topicCon = require("../controllers/topicCon");
const express = require("express");
const router = express.Router();

router.post("/create", topicCon.create);
router.post("/enroll", topicCon.enroll);
router.post("/disEnroll", topicCon.disEnroll);
router.get("/getAll", topicCon.getAll);
router.get("/getAllDemo", topicCon.getAllDemo);
router.post("/getDetail", topicCon.getDetail);
router.post("/update", topicCon.update);
router.post("/approve", topicCon.approve);
router.post("/delete", topicCon.delete);
// router.post("/test", topicCon.test);
router.post("/teacherAssign", topicCon.teacherAssign);

module.exports = router;
