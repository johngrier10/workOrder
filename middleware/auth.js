const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next)=>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})
        
        jwt.verify(token, process.env.TOKEN_SECRET, (err,user)=>{
            if(err) return res.status(400).json({msg: err.message})

            req.user = user;
            res.json(req.user)
            next()
        })
    } catch (err) {
        return res.status({msg: err.message})
    }
}

module.exports = auth