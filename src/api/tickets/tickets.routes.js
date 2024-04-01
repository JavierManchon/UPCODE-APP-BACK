const express = require('express');
const TicketRoutes = express.Router();
const {  getAllTickets, getOneTicket, postOneTicket, patchOneTicket, deleteOneTicket, getTicketsByUser } = require('./tickets.controllers');
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');


TicketRoutes.get('/getAllTickets',[isAuth], getAllTickets);
TicketRoutes.get('/getOneTicket/:id',[isAuth] ,getOneTicket);
TicketRoutes.post('/postOneTicket', [isAuth, upload.single('screenshot')], postOneTicket);
TicketRoutes.patch('/editOneTicket/:id',[isAuth, upload.single('screenshot')] ,patchOneTicket);
TicketRoutes.delete('/deleteOneTicket/:id',[isAuth], deleteOneTicket);
TicketRoutes.get('/getTicketsByUser/:id', [isAuth], getTicketsByUser);


module.exports = TicketRoutes;