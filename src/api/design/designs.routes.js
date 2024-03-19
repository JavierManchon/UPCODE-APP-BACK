const designRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const {createDesign, removeDesign, editDesign, getAllDesigns, getDesignById}= require('./designs.controllers');



designRoutes.post('/createDesign/:userId',[isAuth],createDesign);
designRoutes.delete('/removeDesign/:designId',[isAuth],removeDesign);
designRoutes.patch('/editDesign/:designId',[isAuth],editDesign);
// designRoutes.put('/addticket',[isAuth],addticket);
// designRoutes.put('/closeticket',[isAuth],closeticket);
designRoutes.get('/allDesigns', getAllDesigns);
designRoutes.get('/oneDesign/:designId',[isAuth], getDesignById);
// designRoutes.get('/single',singleticket);



module.exports = designRoutes;