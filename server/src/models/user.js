const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: false,
    },
    username: {
      type: String,
      require: true,
      minlength: 8,
      maxlength: 30,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    major: {
      type: String,
      enum: ["software", "hardware", "security"],
      default: "software",
    },
    isLeader: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["student", "admin", "lecturer"],
      default: "student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
