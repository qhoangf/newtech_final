let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let topicSchema = new mongoose.Schema({
    topic: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 50,
        unique: true,
    },
    description: {
        type: String,
        require: false,
        minlength: 0
    },
    instructors: {
        type: String,
        require: true,
    },
    classType: {
        type: String,
        require: true,
        enum: ['CLA', "CLS", "FIE"],
    },
    reviewer: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    maxStudents: {
        type: Number,
    },
}, { timestamps: true }
);
module.exports = mongoose.model("Topic", topicSchema);