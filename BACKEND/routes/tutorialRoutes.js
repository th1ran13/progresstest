const router = require('express').Router()
//const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')
const Tutorial = require('../models/tutorialModel')


router.get('/tutortutorials' , (req , res)=>{
    Tutorial.find().then(tutorial => res.json(tutorial))
    .catch(err=> res.status(500).json(({msg: err.message})))
});


router.get('/tutortutorials/:id' , (req , res)=>{
    Tutorial.findById(req.params.id)
            .then(tutorial => res.json(tutorial))
            .catch(err=> res.status(500).json(({msg: err.message})))
});

module.exports = router