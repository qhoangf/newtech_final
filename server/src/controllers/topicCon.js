const Topic = require("../models/topic");
const { EmptyCheck } = require("./globalFunc");

const topicController = {
  create: async (req, res) => {
    try {
      const checkResult = EmptyCheck(req);

      if (!checkResult.isValid) {
        return res.status(404).json({ result: "fail", content: checkResult.message });
      }

      let { name, major } = req.body;

      let startDate = new Date();
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 60);

      const newTopic = new Topic({
        name: name,
        major: major,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        instructor: "",
        isApproved: false,
        reviewer: "",
        students: [],
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
      if (!req.body.name) {
        return res.status(404).json({ result: "fail", content: "Topic's name is empty" });
      }

      const { topicId, name, major, instructor, isApproved, reviewer, students } = req.body;

      const updateTopic = await Topic.findByIdAndUpdate(topicId, {
        name,
        major,
        instructor,
        isApproved,
        reviewer,
        students,
      });

      if (updateTopic) {
        return res.status(200).json({ result: "success", content: "Update topic successfully" });
      }
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Update topic fail" });
    }
  },

  // Đăng ký đề tài
  enroll: async (req, res) => {
    try {
      const checkResult = EmptyCheck(req);

      if (!checkResult.isValid) {
        return res.status(404).json({ result: "fail", content: checkResult.message });
      }

      const { userId, name, topicId } = req.body;

      const chosenTopic = await Topic.findById(topicId);
      if (!chosenTopic) {
        return res.status(404).json({ result: "fail", content: "Topic not found." });
      }
      if (chosenTopic.students.some((student) => student.id === userId)) {
        return res.status(404).json({ result: "fail", content: "Student already enrolled in this topic." });
      }

      const otherTopicEnrollCheck = await Topic.findOne({ students: { $elemMatch: { id: userId } } });
      if (otherTopicEnrollCheck) {
        return res.status(404).json({ result: "fail", content: "Student has enrolled in other topic." });
      }

      const objectValue = {
        id: userId,
        name: name,
      };

      if (chosenTopic.students.length == 3) {
        return res.status(404).json({ result: "fail", content: "Not more available slot" });
      }

      chosenTopic.students.push(objectValue);

      await chosenTopic.save();
      return res.status(200).json({ result: "success", content: "Student enroll successfully." });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  disEnroll: async (req, res) => {
    try {
      const checkResult = EmptyCheck(req);

      if (!checkResult.isValid) {
        return res.status(404).json({ result: "fail", content: checkResult.message });
      }

      const { userId, topicId } = req.body;

      const chosenTopic = await Topic.findById(topicId);
      if (!chosenTopic) {
        return res.status(404).json({ result: "fail", content: "Topic not found." });
      }
      if (!chosenTopic.students.some((student) => student.id === userId)) {
        return res.status(404).json({ result: "fail", content: "Student hasn't enrolled in this topic." });
      }

      await Topic.findOneAndUpdate({ _id: topicId }, { $pull: { students: { id: userId } } }, { safe: true, multi: false });
      return res.status(200).json({ result: "success", content: "Student dis-enroll successfully." });
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
      return res.status(404).json({ result: "fail", content: "TopicId is null" });
    }
  },

  delete: async (req, res) => {
    try {
      const topicId = req.body.topicId;

      const result = await Topic.findByIdAndDelete({ _id: topicId });
      if (result) return res.status(200).json({ result: "success", content: "Delete topic succesfully" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Delete topic fail" });
    }
  },

  approve: async (req, res) => {
    try {
      const topicId = req.body.topicId;

      const result = await Topic.findByIdAndUpdate(topicId, { isApproved: true });
      if (result) return res.status(200).json({ result: "success", content: "Approve topic succesful" });
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Approve topic fail" });
    }
  },

  teacherAssign: async (req, res) => {
    try {
      const checkResult = EmptyCheck(req);

      if (!checkResult.isValid) {
        return res.status(404).json({ result: "fail", content: checkResult.message });
      }

      const { topicId, teacherName, isReviewer } = req.body;

      if (isReviewer) {
        const result = await Topic.findByIdAndUpdate(topicId, { reviewer: teacherName });
        if (result) return res.status(200).json({ result: "success", content: "Assign reviewer to topic succesful" });
      } else {
        const result = await Topic.findByIdAndUpdate(topicId, { instructor: teacherName });
        if (result) return res.status(200).json({ result: "success", content: "Assign instructor to topic succesful" });
      }
    } catch (error) {
      return res.status(404).json({ result: "fail", content: "Assign to topic fail" });
    }
  },

  // test: async (req, res) => {
  //   try {
  //     const topicId = req.body.topicId;
  //     const userId = req.body.userId;
  //     const name = req.body.name;

  //     const objectValue = {
  //       id: userId,
  //       name: name,
  //     };

  //     const chosenTopic = await Topic.findById(topicId);

  //     if (chosenTopic.students.some((student) => student.id === userId)) {
  //       return res.status(404).json({ result: "fail", content: "Student already enrolled in this topic." });
  //     }

  //     const otherTopicEnrollCheck = await Topic.findOne({ students: { $elemMatch: { id: userId } } });
  //     if (otherTopicEnrollCheck) {
  //       return res.status(404).json({ result: "fail", content: "Student has enrolled in other topic." });
  //     }

  //     if (!chosenTopic) {
  //       return res.status(404).json({ result: "fail", content: "Topic not found." });
  //     }

  //     chosenTopic.students.push(objectValue);
  //     await chosenTopic.save();

  //     return res.status(200).json({ result: "success", content: "Update topic successfully" });
  //   } catch (error) {
  //     return res.status(404).json({ result: "fail", content: "TopicId is null" });
  //   }
  // },
};

module.exports = topicController;
