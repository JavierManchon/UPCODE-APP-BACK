const Ticket = require('./tickets.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');


const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        return next(error);
    }
}

const getOneTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        res.status(200).json(ticket);
    } catch (error) {
        return next(error);
    }
}

const postOneTicket = async (req, res, next) => {
    try {
        const image = req.file ? req.file.path : null;
        const { title, description, comments, status } = req.body;
        const designId = req.params.designId;
        const userId = req.user.id;
        const newTicket = new Ticket({ 

         title,
         description, 
         comments,
         status,
         image,
         design: designId,
         user: userId  

        });
        res.status(200).json(newTicket);
    } catch (error) {
        return next(error);
    }
}

const patchOneTicket = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtener el id del ticket//
        const { title, description, comments, status } = req.body; //hemos quitado el design ya que es info que no puede ser modificada//
        const updatedTicket = await Ticket.findByIdAndUpdate(id, { title, description, comments, status }, { new: true });
        res.status(200).json(updatedTicket);
    } catch (error) {
        return next(error);
    }
}

const deleteOneTicket = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtener el id del ticket//
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (deletedTicket.image) deleteImgCloudinary(deletedTicket.image);
        res.status(200).json(deletedTicket);
    } catch (error) {
        return next(error);
    }
}



module.exports = { getAllTickets, getOneTicket, postOneTicket, patchOneTicket, deleteOneTicket };