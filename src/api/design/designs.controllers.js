const Design = require('./designs.model');
const { transporter } = require('../../utils/nodemailer-config');
const User = require('../users/users.model');

const createDesign = async (req, res, next) => {
    const userId = req.params.userId;
    const { nameDesign, elementType, children, grandSon, type, countChildren, countGrandson, defaultStyles, edit } = req.body;

    try {
        if (!userId) {
            return res.status(404).json({ msg: 'ID de usuario no encontrado' });
        }

        //Si el valor de template es false lo dejo como está si es true lo cambio a false
        let template = req.body.template || false;
        template = template === true ? false : template;

        const newDesign = new Design({
            nameDesign,
            elementType,
            template,
            defaultContent: {
                children,
                grandSon,
                countChildren,
                countGrandson,
                type
            },
            defaultStyles,
            edit
        });

        await newDesign.save();

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        user.designs.push(newDesign._id);
        await user.save();

        res.status(201).json({ msg: 'Diseño creado y guardado correctamente', data: newDesign });
    } catch (error) {
        next(error);
    }
};


const removeDesign = async (req, res , next) => {
    const designId = req.params.designId;
    try {
        const deletedDesign = await Design.findByIdAndDelete(designId);
        if (!deletedDesign) {
            return res.status(404).json({ msg: 'Diseño no encontrado' });
        }
        // Quitamos l ID  de cualquier usuario que lo tenga en designs
        await User.updateMany({ designs: designId }, { $pull: { designs: designId } });
        res.status(200).json({ msg: 'Diseño eliminado con exito' });
    } catch (error) {
        next(error);
    }
};

const editDesign = async (req, res, next) => {
    try {
        const designId = req.params.designId;
        const { edit } = req.body;
        
        const updatedDesign = await Design.findByIdAndUpdate(designId, { edit }, { new: true });
        
        return res.status(200).json(updatedDesign);
    } catch (error) {
        return next(error);
    }
}

const getAllDesigns = async (req, res, next) => {
    try {
        const designs = await Design.find();
        res.status(200).json(designs);
    } catch (error) {
        return next(error);
    }
}

const getDesignById = async (req, res, next) => {
    const designId = req.params.designId;
    try {
        const design = await Design.findById(designId);
        if (!design) {
            return res.status(404).json({ msg: 'Diseño no encontrado' });
        }
        res.status(200).json(design);
    } catch (error) {
        next(error);
    }
};

module.exports = {createDesign, removeDesign, editDesign, getAllDesigns, getDesignById};
