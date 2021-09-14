const mongoose = require('mongoose');

const enrollStudentSchema = new mongoose.Schema({
    SName : {
        type : String,
        required : true,
    },
    SEmail : {
        type : String,
        required : true  
    },

    SSpecialization : {
        type : String,
        required : true   
    },

})

const EnrollS = mongoose.model("enrolledStudent" , enrollStudentSchema );

module.exports = EnrollS;