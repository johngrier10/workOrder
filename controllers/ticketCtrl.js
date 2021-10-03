const Tickets = require('../models/ticketModel')

const ticketCtrl = {
    getTickets: async (req, res) =>{
        try {
            res.json({user_id: req.user.id})
            const tickets = await Tickets.find({user_id: req.user.id})
        } catch (error) {
            return res.status(500).json({msg: error.message})

        }
    }
}

module.exports = ticketCtrl