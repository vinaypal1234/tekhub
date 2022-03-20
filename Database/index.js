// IMPORT  MONGOOSE TO CONNECT WITH DATABASE
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tekhub").then(() => {

    console.log("Database Connection Successfull");

});


// EXPORT
module.exports = mongoose;