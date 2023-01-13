const constants = require("../utils/constants");

exports.ticketValReq = (req, res, next) => {
    if(!req.body.title) {
        return res.status(400).send({
            message : `Failed! Title is not provided !`
        });
    }

    if(!req.body.description) {
        return res.status(400).send({
            message : `Failed! description is not provided !`
        });
    }
    next();
}

exports.ticketUpdateReqVal = (req, res, next) => {
    const ticketStatus = req.body.status;
    // if(!ticketStatus) {
    //     return res.status(400).send({
    //         message : `Failed! Ticket status is not provided !`
    //     })
    // }
    const ticketStatusType = [constants.ticketStatus.open, constants.ticketStatus.in_progress, constants.ticketStatus.closed, constants.ticketStatus.blocked];
    if(ticketStatus && !ticketStatusType.includes(ticketStatus)) {
        return res.status(400).send({
            message: "Failed! status provided is invalid. Possible values CLOSED | BLOCKED | IN_PROGESS | OPEN"
        });
    }
    next();
}