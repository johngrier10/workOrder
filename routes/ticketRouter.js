const router = require('express').Router()
const auth = require('../middleware/auth')
const ticketCtrl = require('../controllers/ticketCtrl')

router.route('/')
    .get(auth, ticketCtrl.getTickets)
    .post

router.route('/:id')
    .get()
    .patch()
    .delete()

module.exports= router