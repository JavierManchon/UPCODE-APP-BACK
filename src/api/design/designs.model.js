const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  nameDesign: {
    type: String,
    required: true,
    trim: true 
  },
  packs:{
    name: {
        type:String,
        required:true,
    },
    html: {
        type:String,
        required:true,
    },  
//     css: {
//         required:true ,
//         properties:{ 
//             width:{
//                 number:{
//                     type:Number,
//                 },
//                 type:{
//                     type:String,
//                     enum:["%","px"],
//                 }
//             },
//             heigth:{
//                 number:{
//                     type:Number,
//                 },
//                 type:{
//                     type:String,
//                     enum:["%","px"],
//                 }
//             },
//             display: { type: String, default: "flex" },
//             flex_direction: { type: String, enum: ["row", "row-reverse", "column", "column-reverse"], required: true },
//             flex_wrap: { type: String, enum: ["wrap", "nowrap"], required: true },
//             justify_content: { type: String, enum: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"], required: true },
//             align_items: { type: String, enum: ["flex-start", "flex-end", "center", "baseline", "stretch"], required: true }, // Ajustado para incluir valores válidos de align-items
//             position: { type: String, enum: ["absolute", "relative", "fixed", "sticky"], required: true }, // Corregido "absolte" por "absolute"
//             top:"",
//             bottom:"",
//             left:"",
//             right:"",
//             color: "",
//             background_color:"",
//             font_size:"",   
//             font_weight:"",
//             text_decoration:"none",
//             border_radius:{
//                 number:{
//                     type:Number,
//                 },
//                 type:{
//                     type:String,
//                     enum:["%","px"],
//                 }
//             },
//             border:{
//                 number:{
//                     type:Number,
//                 },
//                 size:{
//                     type:String,
//                     enum:["%","px"],
//                 },
//                 type:{
//                     type:String,
//                     enum:["solid","dotted","dashed","double","groove","ridge","inset","outset"],
//                 },
//                 color:{
//                     type:String,
//                 }

//             },

//             },
//            className: {
//             type:String,
//             required:true,    
//             }  
// },
    css:[{
        type:String,
        required:true,
    }],
    userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'tickets'
  }]
}}
);

const Design = mongoose.model('designs', designSchema);
module.exports = Design;

