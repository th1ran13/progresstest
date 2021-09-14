require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());

//Routes
/*-----------------Tutors and Tutorial-------------------- */
app.use('/tutor' , require('./routes/tutorRouter'))
app.use('/' , require ('./routes/tutorialRoutes'))
// const tutorRouter = require('./routes/tutor')
// app.use('/tutor' , tutorRouter)

/*--------------------------------------------------------- */



//port
const PORT = process.env.PORT || 8050;

//connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL , {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false
} , err=>{
    if(err)throw err;
    console.log("Mongodb connection SUCCESS!")
})



app.listen(PORT , () => {
    console.log(`server is up and running on port number: ${PORT}`);
})