const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
    writer :{
        type : Schema.Types.ObjectId,
        ref : 'Tutor'
    },
    title : {
        type : String,
        required : true
    },
    article : {
        type : String,
        required : true
    },
    authorName : {
        type : String,
        required : true
    },
    articleImage :{
        type : String,
        required : true
    }

})

const Tutorial = mongoose.model('Tutorial' , tutorialSchema);
module.exports = Tutorial;