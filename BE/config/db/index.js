let { model } = require("mongoose");
let mongoose = require('mongoose');

 async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/newTechFinal');
        console.log("Connect Successfull!")
    } catch (error) {
        console.log("Connect Failed!")
    }
}

module.exports = {  connect };