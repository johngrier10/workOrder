const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    location: String,
    date: { type: Date, default: Date.now },
    workRequested: String,
    assignedTo: String,
    workCompleted: String,
    dateCompleted: Date,
    approvedBy: String
})

module.exports = mongoose.model('Tickets', ticketSchema)