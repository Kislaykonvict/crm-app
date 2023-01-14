const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const constants = require('../utils/constants');
const { ticketResponse, ticketListResponse } = require('../utils/objectConvertor');

exports.createTicket = async (req, res) => {
    const body = req.body;

    const ticketObj = {
        title : body.title,
        description : body.description,
        ticketPriority : body.ticketPriority,
        reporter : req.userId
    }

    try {
        //finding an engineer for ticket assignment
        const engineer = await User.findOne(
            {
                userType : constants.userTypes.engineer,
                userStatus : constants.userStatus.approved
            }
        )
        ticketObj.assignee = engineer.userId;

        //creating new ticket
        const [ticket, user] = await Promise.all([Ticket.create(ticketObj), User.findOne({userId : req.userId})]);

        //updating user's and engineer's details
        user.ticketCreated.push(ticket._id);
        engineer.ticketAssigned.push(ticket._id);
        ticket.__v = undefined;
        await Promise.all([user.save(), engineer.save()]);

        res.status(201).send(ticketResponse(ticket));

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after some time !`
        })
    }
}

exports.updateTicket = async (req, res) => {
    const reqId = req.params.id;
    const body = req.body
    try {
        const ticketInDb = await Ticket.findOne({_id : reqId});
        if(ticketInDb.reporter == req.userId || ticketInDb.assignee == req.userId || req.role == constants.userTypes.admin) {
            ticketInDb.title = body.title ?? ticketInDb.title,
            ticketInDb.status = body.status ?? ticketInDb.status,
            ticketInDb.description = body.description ?? ticketInDb.description,
            ticketInDb.priority = body.description ?? ticketInDb.priority

            const updatedTicket = await ticketInDb.save();
            res.status(200).send(ticketResponse(updatedTicket));
        }
        else {
            console.log("Ticket was being updated by someone who has not created the ticket");
            res.status(401).send({
                message: "Ticket can be updated only by the Customer who created it or the Engineer who is assigned to it."
            });
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after some time !`
        })
    }
}

exports.getAllTickets = async (req, res) => {
    const queryObj = {};
    if(req.query.status) {
        queryObj.status = req.query.status;
    }
    if(req.role === constants.userTypes.engineer) {
        queryObj.assignee = req.userId;
    }
    if(req.role === constants.userTypes.customer) {
        queryObj.reporter = req.userId;
    }
    try {
        const ticketsInDb = await Ticket.find(queryObj);
        res.status(200).send(ticketListResponse(ticketsInDb));
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after some time !`
        })
    }
}

exports.getTicketOnId = async (req, res) => {
    const reqId = req.params.id;

    try {
        const ticketInDb = await Ticket.findOne({_id : reqId});
        if(!ticketInDb) {
            return res.status(404).send({
                message : `Ticket doesn't exist !`
            })
        }
        res.status(200).send(ticketResponse(ticketInDb));
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after some time !`
        })
    }
}