const Topic = require("../models/Topic");

const topicController = {
  create: async (req, res) => {
    try {
      let { name, major, instructor, isApproved, reviewer, students } = req.body;
      let startDate,
        endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);

      const newTopic = new Topic({
        name: name,
        major: major,
        startDate: startDate,
        endDate: endDate,
        instructor: instructor,
        isApproved: isApproved,
        reviewer: reviewer,
        students: students,
      });

      const result = await newTopic.save();
      if (result) return res.status(200).json({ result: "success", content: "Add topic successfully" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Add topic failed" });
    }
  },

  getAll: async (req, res) => {
    try {
      const topics = await Topic.find();
      return res.status(200).json({ result: "success", content: topics });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const { topicId, name, major, instructor, isApproved, reviewer, students } = req.body;

      const updateTopic = await Topic.findByIdAndUpdate(topicId, {
        name,
        major,
        instructor,
        isApproved,
        reviewer,
        students,
      });

      if (!updateTopic) {
        return res.status(404).json({ result: "success", content: "Update topic successfully" });
      }
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Update topic fail" });
    }
  },

  // Đăng ký đề tài
  enroll: async (req, res) => {
    try {
      const { userId, topicId } = req.body;
      const chosenTopic = await Topic.findById(topicId);
      if (!chosenTopic) {
        return res.status(404).json({ result: "fail", content: "Topic not found." });
      }
      if (chosenTopic.students.includes(userId)) {
        return res.status(404).json({ result: "fail", content: "User already enrolled." });
      }
      if (chosenTopic.students.length == 3) {
        return res.status(404).json({ result: "fail", content: "Not more available slot" });
      }

      chosenTopic.students.push(userId);

      await chosenTopic.save();
      return res.status(200).json({ result: "success", content: "Enroll successfully." });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  getDetail: async (req, res) => {
    try {
      const topicId = req.body.topicId;

      const topic = await Topic.findById({ _id: topicId });
      if (!topic) return res.status(404).json({ result: "fail", content: "Topic not found!" });

      return res.status(200).json({ result: "success", content: topic });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: error });
    }
  },

  delete: async (req, res) => {
    try {
      const topicId = req.body.topicId;

      const result = await Topic.findByIdAndDelete({ _id: topicId });
      if (result) return res.status(200).json({ result: "success", content: "Delete topic succesful" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Delete topic fail" });
    }
  },
};

module.exports = topicController;
