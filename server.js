require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const ticketRouter = require('./routes/ticketRouter')
const logger = require('morgan')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use(logger('dev'))
app.use('/users',userRouter)
app.use('/api/tickets', ticketRouter)

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
},err=>{
    if (err) throw err;
    console.log('Connected to MongoDB')
})



const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})