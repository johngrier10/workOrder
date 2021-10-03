const Users = require('../models/userModel')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {

 

    registerUser: async (req, res) => {
        try {
            
            //From the request body, destructure fields.
            const {username, email, password} = req.body
            const user = await Users.findOne({email: email})
            if (user) return res.status(400).json({msg:"The email already exists."})
            res.json(username, password)
            const passwordHash = await bcrypt.hash(password, 10)

            res.json(passwordHash)

            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            
            await newUser.save()
            return res.json({msg: "Successfully signed up"})
        
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    
    loginUser: async (req, res) => {

        try {
            const { email, password} = req.body;
            const user = await Users.findOne({email:email})
            if(!user) return res.status(400).json({msg: "User does not exist"})
            
            const aMatch = await bcrypt.compare(password, user.password)
            if(!aMatch) return res.status(400).json({msg:"Incorrect password"})

            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})
            res.json({token})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        // res.json({msg: "Login a User from the controller"})
    },
    verifyToken: async (req, res)=>{
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token,process.env.TOKEN_SECRET, async(err,verified)=>{
                if(err) return res.send(false)

                const user = await Users.findById(verified.id)
                if (!user) return res.send(false)

                return res.send(true)

            })

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }


}

module.exports = userCtrl