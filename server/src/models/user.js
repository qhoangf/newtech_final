const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 8,
      maxlength: 30,
      unique: false,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    major: {
      type: String,
      default: "software",
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
