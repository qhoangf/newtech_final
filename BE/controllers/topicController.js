let Topic = require("../models/Topic");

let topicController = {

    // Tạo đề tài
    createTopic: async (req, res) => {
        try {
            let newTopic = await new Topic({
                // Kiểu dữ liệu
                // topic - require
                // description - require
                // instructors - require + unique
                // faculty - require
                // reviewer - require
                // typeTopic

                topic: req.body.topic,
                description: req.body.description,
                instructors: req.body.instructors,
                faculty: req.body.faculty,
                reviewer: req.body.reviewer,
                typeTopic: req.body.typeTopic,
            });

            // Lưu data xuống Mongo DB
            await newTopic.save();
            return res.status(200).json("Add topic successfully");
        } catch (error) {
            return res.status(500).json({ message: 'Add topic failed', error: error.message });
        }
    },

    // Show full đề tài
    getAllTopic: async (req, res) => {
        try {
            let newTopic = await Topic.find();
            return res.status(200).json(newTopic);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // Cập nhật dề tài
    updateTopic: async (req, res) => {
        try {
            let {
                topic,
                description,
                instructors,
                faculty,
                reviewer,
                typeTopic
            } = req.body;

            let updateTopic = await Topic.findByIdAndUpdate(req.params.id, {
                topic,
                description,
                instructors,
                faculty,
                reviewer,
                typeTopic,
            });

            if (!updateTopic) {
                return res.status(404).json({ message: 'Topic not found' });
            } else {
                return res.status(200).json({ message: 'Topic update successfully' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Topic update failed', error: error.message });
        }
    },

    // Đăng ký đề tài
    registerTopicFromUser: async (req, res) => {
        // userId = jsonWebToken
        let userId = req.user.id;
        try {
            let topicId = req.params.id;
            let chosenTopic = await Topic.findById(topicId);
            if (!chosenTopic) {
                return res.status(404).json("Topic not found.");
            }
            if (chosenTopic.students.includes(userId)) {
                return res.status(400).json("User registered already.");
            }
            if (chosenTopic.students.length >= chosenTopic.maxStudents) {
                return res.status(400).json("Reached max quantity in this topic. Register failed!");
            }

            // Thêm MSSV sinh viên vào members đề tài (max 3 sv mỗi đề tài)
            chosenTopic.students.push(userId);
            if (chosenTopic.students.length >= chosenTopic.maxStudents) {
                chosenTopic.isHidden = true;
            }

            await chosenTopic.save();
            return res.status(200).json("Register successfully.");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
}

module.exports = topicController;