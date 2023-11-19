let express = require('express');
let router = express.Router();

let hashMiddlewareController = require("../controllers/hashMiddlewareController");
let topicController = require("../controllers/topicController")

router.post("/register/:id", hashMiddlewareController.verifyTokenAndStudentAuth, topicController.registerTopicFromUser);

router.post("/create", hashMiddlewareController.verifyTokenAndLecturerAuth, topicController.createTopic);

router.get("/", topicController.getAllTopic);

router.put("/update/:id", hashMiddlewareController.verifyTokenAndLecturerAuth, topicController.updateTopic);

module.exports = router;