const designRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const {create, remove, edit, alldesigns}= require('./designs.controllers');



designRoutes.post('/create/:userId',[isAuth],create);
designRoutes.delete('/remove/:designId',[isAuth],remove);
designRoutes.put('/edit/:designId',[isAuth],edit);
// designRoutes.put('/addticket',[isAuth],addticket);
// designRoutes.put('/closeticket',[isAuth],closeticket);
designRoutes.get('/all', alldesigns);
// designRoutes.get('/single',singleticket);



module.exports = designRoutes;