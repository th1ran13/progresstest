const jwt = require('jsonwebtoken')
//process.env.SECRET_KEY = 'secret';

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, tutor) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.tutor = tutor
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth