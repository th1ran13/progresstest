const Tutor = require('../models/tutorModel')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const Tutorial = require('../models/tutorialModel')

// const multer  = require("multer")
// const storage = multer.diskStorage({
//     destination: (req , file , callback)=>{
//         callback(null ,'../uploads/');

//     },
//     filename : (req , file , callback)=>{
//         callback(null , file.originalname);
//     }
// })

// const upload = multer({storage : storage})

// process.env.SECRET_KEY = '35e32882d04799133eea2fdbeef88cee807a0b3c45b4a4a8014453760a2e856e570b16e05155444feda130572186395b2e0b35fe5a944d94db6a9b1c555f94c8';
// process.env.ACCESS_TOKEN_SECRET = '9f24069a04ecbd8f7b3958e104cee3a9287e2b0b547efd8dc61860e7b35b857f989cc508402bee8f2ba73c893d71cecc08a466b39e80ffff548507f5854bd532';
// process.env.REFRESH_TOKEN_SECRET = '9f24069a04ecbd8f7b3958e104cee3a9287e2b0b547efd8dc61860e7b35b857f989cc508402bee8f2ba73c893d71cecc08a466b39e80ffff548507f5854bd532';
// const tutorCtrl = {
//     register : async (req , res) =>{

//         const tutorFirstName       = req.body.tutorFirstName;
//         const tutorLastName        = req.body.tutorLastName;
//         const tutorEmail           = req.body.tutorEmail;
//         const tutorFaculty         = req.body.tutorFaculty;
//         const tutorSpecialization  = req.body.tutorSpecialization;
//         const tutorSubject         = req.body.tutorSubject;
//         const tutorExperiene       = req.body.tutorExperiene;
//         const tutorPassword1       = req.body.tutorPassword1;
      
//         const tutor = await Tutor.findOne({tutorEmail})
//         if(tutor)  return res.status(400).json({msg : "This email already exists."})

//         const passwordHash = await bcrypt.hash(tutorPassword1 , 12)
//         console.log({tutorPassword1 ,   passwordHash})

//         const newTutor = new Tutor({
//             tutorFirstName , tutorLastName , tutorEmail , tutorFaculty ,
//             tutorSpecialization , tutorSubject , tutorExperiene , passwordHash
//         })
//         await newTutor.save()
                       
//     },
//     login :async (req , res) =>{
//         try {
//             const {tutorEmail , tutorPassword1} = req.body
//             const tutor = await Tutor.findOne({tutorEmail})
//             if(!tutor) return res.status(400).json({msg: "User does not exist"})

//             const isMatch = await bcrypt.compare(tutorPassword1, tutor.tutorPassword1)
//             if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
            
//             //console.log(tutor)

//             res.json({msg: "Login Success!"})
//         } catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     },
// }



const tutorCtrl = {
    register : async (req , res) =>{
        try{
            const {tutorFirstName , tutorLastName , tutorEmail , tutorFaculty ,
                  tutorSpecialization , tutorSubject , tutorExperiene , tutorPassword1} = req.body
            /*if (!tutorEmail || !tutorPassword1)
                return res.status(400).json({msg : "Please fill all the field."})*/
            const tutor = await Tutor.findOne({tutorEmail})
            if(tutor)  return res.status(400).json({msg : "This email already exists."})
            
            const passwordHash = await bcrypt.hash(tutorPassword1 , 12)
            /*console.log({tutorPassword1 ,   passwordHash})*/

            const newTutor = new Tutor({
                tutorFirstName , tutorLastName , tutorEmail , tutorFaculty ,
                tutorSpecialization , tutorSubject , tutorExperiene , tutorPassword1 : passwordHash
            })
            await newTutor.save().then(()=>{
                res.json({msg :"Successfully Registered"})
            })
            

            //res.json({msg : "Register Test"})
        }catch (err){
            return res.status(500).json ({msg : err.message})
        }
    },

    login :async (req , res) =>{
        try {
            const {tutorEmail , tutorPassword1} = req.body
            const tutor = await Tutor.findOne({tutorEmail})
            if(!tutor) return res.status(400).json({msg: "User does not exist"})
            
            const isMatch = await bcrypt.compare(tutorPassword1, tutor.tutorPassword1)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
                        
            //console.log(tutor)
            const refresh_token = createRefreshToken({id: tutor._id})
            res.cookie('refreshtoken', refresh_token, {
               httpOnly: true,
               path: '/tutor/tutor_refresh_token',
               maxAge: 7*24*60*60*1000 // 7 days
            })
            res.send(refresh_token)
            //res.json({msg: "Login Success!"})

            // const {tutorEmail} = req.body
            // const tutor = await Tutor.findOne({tutorEmail})
            // if(tutor){
            //     if(tutor){
            //         if(bcrypt.compareSync(req.body.tutorPassword1 , tutor.tutorPassword1)){
            //             const payload = {
            //                 _id : tutor._id,
            //                 tutorFirstName       : tutor.tutorFirstName,
            //                 tutorLastName        : tutor.tutorLastName,
            //                 tutorEmail           : tutor.tutorEmail,
            //                 tutorFaculty         : tutor.tutorFaculty,
            //                 tutorSpecialization  : tutor.tutorSpecialization,
            //                 tutorSubject         : tutor.tutorSubject,
            //                 tutorExperiene       : tutor.tutorExperiene
            //             }
        
            //             const token = jwt.sign(payload , process.env.REFRESH_TOKEN_SECRET , {
            //                 expiresIn : 1440    
            //             })
            //             res.cookie('token' , token , {
            //                 httpOnly : true,
            //                 path : 'tutor/refresh_token',
            //                 maxAge : 7*24*60*60*1000 // 7 days
            //             })
            //             //res.send(token)
            //             //res.json(token)
            //             res.json({msg: "Login Success!"})
            //         }else{
            //             res.json({msg : "user does not exists in the system"})
                        
            //         }
            //     }else{
            //         res.json({msg : "user does not exists in the system"})
            //     }
                
            // }           
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAccessToken : (req , res)=>{
      try{
          const rf_token = req.cookies.refreshtoken
          //console.log(rf_token)
          if(!rf_token) return res.status(400).json({msg: "Please login now!"})

          jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, tutor) => {
              if(err) return res.status(400).json({msg: "Please login now!"})
              //console.log(tutor)
              const access_token = createAccessToken({id: tutor.id})
              res.json({access_token})
           })

      }catch{
        return res.status(500).json({msg: err.message})
      }
    },
    getInfo : async (req , res)=>{
        try{
            // var decoded = jwt.verify(req.headers['authorization'] , process.env.SECRET_KEY)
            // Tutor.findOne({
            //     _id : decoded._id
            // })
            // .then(user =>{
            //     if(user){
            //         res.json(user)
            //     }else{
            //         res.send("user does not exist")
            //     }
            // })
            const tutor = await Tutor.findById(req.tutor.id).select('-tutorPassword1')
            res.json(tutor)
        }catch{
            return res.status(500).json({msg : err.message})
        }
    },

    getAllInfo : async (req , res)=>{
        try{
            //console.log(req.tutor)
            const tutor = await Tutor.find().select('-tutorPassword1')

            res.json(tutor)
        }catch{
            return res.status(500).json({msg: err.message})
        }
    },

    logOut : async (req , res) =>{
        try{
            res.clearCookie('refreshtoken' , {path : '/tutor/tutor_refresh_token'})
            return res.json({msg : "Logging Out"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateTutor : async (req , res)=>{
        try{

            const {tutorFirstName , tutorLastName} = req.body
            await Tutor.findOneAndUpdate({_id :req.tutor.id} , {
                 tutorFirstName  , tutorLastName
            })

            res.json({msg : "Successfully Updated"})
        }catch{
            return res.status(500).json({msg: err.message})
        }
    },

    deleteTutor : async (req , res) =>{
        try{
            await Tutor.findByIdAndDelete(req.params.id)
            res.json({msg : "Deleted Success"})
        }catch{
            return res.status(500).json({msg: err.message})
        }
    },
    //viewtutorial
    // findTutorial : async (req , res)=>{
    //     try{
    //         Tutorial.find().then(tutorial => res.json(tutorial))
    //     }catch{
    //         return res.status(500).json({msg: err.message})
    //     }
    // },

    // //add tutorial
    // addTutorial : async (req , res)=>{
    //     try{
    //         // upload.single("articleImage")
    //         const newTutorial = new Tutorial({
    //             title : req.body.title,
    //             article : req.body.article,
    //             authorName : req.body.authorName,
    //             // articleImage : req.file.originalname
    //         })

    //         newTutorial.save().then(()=> res.json("The new Article Added Successfully"))

    //     }catch{
    //         return res.status(500).json({msg: err.message})
    //     }
    // },

    //find article
    findTutorialById : async (req , res)=>{
        try{
            Tutorial.findById(req.params.id)
            .then(tutorial => res.json(tutorial))
        }catch{
            return res.status(500).json({msg: err.message})
        }
       
    },

    //updatearticle
    // updateTutorial : async (req ,res)=>{
    //     try{
    //         // const {tutorFirstName , tutorLastName} = req.body
    //         // await Tutor.find()
    //         Tutorial.findById(req.params.id)
    //         .then (tutorial =>{
    //             tutorial.title = req.body.title,
    //             tutorial.article = req.body.article,
    //             tutorial.author = req.body.author

    //             tutorial.save().then(()=>res.json("The Article Updated"))
    //         })
    //     }catch{
    //         return res.status(500).json({msg: err.message})
    //     }
    // }


}

const createRefreshToken = (payload) => {
     return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}


module.exports = tutorCtrl