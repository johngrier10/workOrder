const router = require('express').Router()

router.route('/')
    .get((req,res)=>{res.json({msg: "Ticket List"})})
    .post

router.route('/:id')
    .get()
    .patch()
    .delete()

module.exports= router