const express = require('express');
const { createTicket, updateTicket, getAllTickets, getTicketOnId } = require('../controllers/ticket.controller');
const { verifyToken } = require('../middlewares/authValidator');
const { ticketValReq, ticketUpdateReqVal } = require('../middlewares/ticketValidator');
const router = express.Router();

router.post('/create', [verifyToken, ticketValReq], createTicket);
router.put('/update/:id', [verifyToken, ticketUpdateReqVal], updateTicket);
router.get('/', [verifyToken], getAllTickets);
router.get('/:id', [verifyToken], getTicketOnId);
module.exports = router;