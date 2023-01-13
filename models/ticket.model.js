const mongoose = require('mongoose');
const { ticketStatus } = require('../utils/constants');

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        default : 4
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ticketStatus,
        default : "OPEN"
    },
    reporter : {
        type : String
    },
    assignee : {
        type : String
    },

},
    {timestamps : true}
)

module.exports = mongoose.model('Ticket', ticketSchema)