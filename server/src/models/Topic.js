let mongoose = require("mongoose");

let topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      require: true,
      unique: true,
    },
    topicMajor: {
      type: String,
      require: false,
      minlength: 0,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    lecturer: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    reviewer: {
      type: String,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("topic", topicSchema);
