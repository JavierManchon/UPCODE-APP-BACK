const Design = require('./designs.model');
const { transporter } = require('../../utils/nodemailer-config');
const User = require('../users/users.model');

const create = async (req, res , next) => {
    try {
        const newDesign = new Design;
    }catch (error){
        return next(error);
    }
};

const remove = async (req, res , next) => {
    const designId =  req.params;

    try{
        const designToRemove = Design.findByIdAndDelete(designId);
        return res.status(200)({msg:'diseño eliminado con exito', data:designToRemove})
    }catch (error){
        return next(error);
    }
};
const edit = async (req, res, next) => {
    const designId = req.params;
    const html = req.body.html;
    const css = req.body.css;
    

    try{
        const searchDesign = Design.findById(designId);
    }catch (error){
        return next(error);
    }



}

const alldesigns = async (req, res, next) => {
    try {
        const designs = await Design.find();
        res.status(200).json(designs);
    } catch (error) {
        return next(error);
    }
}
module.exports = {create, remove, edit, alldesigns};




//enum: ["footer","section(article)","headerNavigator", "mainPage","col(colgroup)","formComplete","tableComplete","figureComplete","orderedList","unOrderedList","sectionList"],


//enum: ['<a href="" class="link">',"<br>",'<button class="button" type="" >','<div class="container">','<h1 class>',"<h2>","<h3>","<hr>",'<img src="">', '<input type="" name="" id="">',"<nav>","<p>","<span>"]