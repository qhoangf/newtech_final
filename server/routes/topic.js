let express = require('express');
let router = express.Router();

let hashMiddlewareController = require("../controllers/hashMiddlewareController");
let topicController = require("../controllers/topicController")

router.post("/registerTopic/:id", hashMiddlewareController.verifyTokenAndStudentAuth, topicController.registerTopicFromUser);

router.post("/createTopic", hashMiddlewareController.verifyTokenAndLecturerAuth, topicController.createTopic);

router.get("/getAllTopic", topicController.getAllTopic);

router.post("/updateTopic/:id", hashMiddlewareController.verifyTokenAndLecturerAuth, topicController.updateTopic);

module.exports = router;