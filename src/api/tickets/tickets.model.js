const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema(

    {

    title: { 
        type: String,
        trim: true,
        required: true 
        },

    description: { 
        type: String,
        required: true 
    },

    comments: { 
    type: String, 
    },

    status: { 
    type: String,
    enum: ["Enviado", "En proceso", "Completado"], 
    default: "Enviado",
    },

    screenshot: {
     type: String, 
    default: null
    },

    user: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: 'users' 
},

},
{
    timestamps: true
}
);

const Ticket = mongoose.model('tickets', ticketSchema);

module.exports = Ticket;
