const design = require('./designs.model');
const { transporter } = require('../../utils/nodemailer-config');
const User = require('../users/users.model');



const create = async (req, res , next) => {
    const userId = req.params;
    const html = req.body.html;
    const css = req.body.css;
    const name = req.body.name;
    const newDesign= new design();
    try{
        if(html && !css){
            newDesign.html = html;
            newDesign.name = name;
            newDesign.type = 'html';
            newDesign.userId = userId;
            newDesign.save();
            return res.status(200).json({msg:'html guardado con exito', data:newDesign});
        }
        if(!html && css){
            newDesign.css = css;
            newDesign.name = name;
            newDesign.type = 'css';
            newDesign.userId = userId;
            newDesign.save();
            return res.status(200).json({msg:'css guardado con exito', data:newDesign});
        }
        if(html && css){
            newDesign.html = html;
            newDesign.css = css;
            newDesign.name = name;
            newDesign.type = 'both';
            newDesign.userId = userId;
            newDesign.save();
            return res.status(200).json({msg:'both guardado con exito', data:newDesign});
        }
    }catch (error){
        return next(error);
    }
};

const remove = async (req, res , next) => {
    const designId =  req.params;

    try{
        const designToRemove = design.findByIdAndDelete(designId);
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
        const searchDesign = design.findById(designId);
        if()






    }catch (error){
        return next(error);
    }



}
module.exports = {create, remove,edit};




//enum: ["footer","section(article)","headerNavigator", "mainPage","col(colgroup)","formComplete","tableComplete","figureComplete","orderedList","unOrderedList","sectionList"],


//enum: ['<a href="" class="link">',"<br>",'<button class="button" type="" >','<div class="container">','<h1 class>',"<h2>","<h3>","<hr>",'<img src="">', '<input type="" name="" id="">',"<nav>","<p>","<span>"]