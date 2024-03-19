const express = require('express');
const TicketRoutes = express.Router();
const {  getAllTickets, getOneTicket, postOneTicket, patchOneTicket, deleteOneTicket } = require('./tickets.controllers');
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');


TicketRoutes.get('/getAllTickets',[isAuth], getAllTickets);
TicketRoutes.get('/getOneTicket/:designId',[isAuth] ,getOneTicket); //Id del diseño//
TicketRoutes.post('/postOneTicket/:designId/:userId', upload.single('image'), postOneTicket);
TicketRoutes.patch('/editOneTicket/:id',[isAuth, upload.single('image')] ,patchOneTicket);
TicketRoutes.delete('/deleteOneTicket/:id',[isAuth], deleteOneTicket);

module.exports = TicketRoutes;