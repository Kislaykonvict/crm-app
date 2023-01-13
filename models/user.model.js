const mongoose = require('mongoose');
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : 10,
        lowercase : true
    },
    userType : {
        type : String,
        enum : constants.userTypes,
        default : constants.userTypes.customer
    },
    userStatus : {
        type : String,
        enum : constants.userStatus,
        default : constants.userStatus.approved
    },
    ticketCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : 'Ticket'
    },
    ticketAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : 'Ticket'
    }

},
    {timestamps : true}
)

module.exports = mongoose.model('User', userSchema);