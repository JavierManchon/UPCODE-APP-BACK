const designRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const {createDesign, removeDesign, editDesign, getAllDesigns, getDesignById, getUserDesigns, likeSystem}= require('./designs.controllers');



designRoutes.post('/createDesign/:userId',createDesign); //Falta el isAuth, quitado para la pruebas
designRoutes.delete('/removeDesign/:designId',[isAuth],removeDesign);
designRoutes.patch('/editDesign/:designId',[isAuth],editDesign);
// designRoutes.put('/addticket',[isAuth],addticket);
// designRoutes.put('/closeticket',[isAuth],closeticket);
designRoutes.get('/allDesigns', getAllDesigns);
designRoutes.get('/oneDesign/:designId', getDesignById);
designRoutes.get('/designByUser/:userId',[isAuth], getUserDesigns);
designRoutes.patch('/likes/:designId/:userId', [isAuth], likeSystem)
// designRoutes.get('/single',singleticket);



module.exports = designRoutes;