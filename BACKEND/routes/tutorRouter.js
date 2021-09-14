const router = require('express').Router()
const tutorCtrl = require('../controllers/tutorCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const Tutorial = require('../models/tutorialModel')



router.post('/tutorregister' , tutorCtrl.register)
router.post('/tutorlogin' , tutorCtrl.login)
router.post('/tutor_refresh_token' , tutorCtrl.getAccessToken) 
router.get('/tutorinfo', auth ,   tutorCtrl.getInfo )
router.get('/tutorallinfo', auth , authAdmin ,  tutorCtrl.getAllInfo )
router.get('/tutorlogout' , tutorCtrl.logOut) 
router.patch('/tutorupdate' , auth ,  tutorCtrl.updateTutor)
router.delete('/tutordelete/:id' , auth , authAdmin , tutorCtrl.deleteTutor )



const multer  = require("multer")

const storage = multer.diskStorage({
    destination: (req , file , callback)=>{
        callback(null ,'../frontend/public/uploads/');

    },
    filename : (req , file , callback)=>{
        callback(null , file.originalname);
    }
})

const upload = multer({storage : storage});




router.post('/tutoraddarticle' ,upload.single("articleImage") , (req , res)=>{
    const newTutorial = new Tutorial({
        title : req.body.title,
        article : req.body.article,
        authorName : req.body.authorName,
        articleImage : req.file.originalname
    });
    newTutorial.save().then(()=> res.json("The new Article Added Successfully"))
    .catch(err=> res.status(500).json(({msg: err.message})))
});


// router.get('/tutortutorials' , (req , res)=>{
//     Tutorial.find().then(tutorial => res.json(tutorial))
//     .catch(err=> res.status(500).json(({msg: err.message})))
// });


// router.get('/tutortutorials/:id' , (req , res)=>{
//     Tutorial.findById(req.params.id)
//             .then(tutorial => res.json(tutorial))
//             .catch(err=> res.status(500).json(({msg: err.message})))
// });


module.exports = router