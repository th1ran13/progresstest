const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    tutorFirstName : {
        type : String,
        required : true,
    },

    tutorLastName : {
        type : String,
        required : true,
    },

    tutorEmail : {
        type : String,
        required : true  
    },

    tutorRole : {
        type : Number,
        default : 0  // 0 = user  1 = admin
    },

    tutorFaculty : {
        type : String,
        required : true
    },

    tutorSpecialization : {
        type : String,
        required : true   
    },

    tutorSubject : {
        type : String,
        required : true   
    },

    tutorExperiene : {
        type : String,
        required : true   
    },

    tutorPassword1 :{
        type : String,
        required : true
    },
   

})


const Tutor = mongoose.model("tutordetails" , tutorSchema );

module.exports = Tutor;