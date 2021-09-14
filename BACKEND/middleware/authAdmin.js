const Tutor = require('../models/tutorModel')

const authAdmin = async (req, res, next) => {
    try {
        const tutor = await Tutor.findOne({_id: req.tutor.id})

        if(tutor.tutorRole !== 1) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin