let mongoose = require("mongoose");

let topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    major: {
      type: String,
      require: true,
      minlength: 0,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    instructor: {
      type: String,
    },
    reviewer: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    students: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("topic", topicSchema);
