let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlength:8,
        maxlength:30,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    email:{
        type:String,
        require:true,
        minlength:8,
        maxlength:40,
        unique:true,
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'], 
        default: 'student', 
    },


},{timestamps:true}
);

module.exports = mongoose.model("User",userSchema);