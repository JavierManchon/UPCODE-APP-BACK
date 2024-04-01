const Design = require('./designs.model');
const { transporter } = require('../../utils/nodemailer-config');
const User = require('../users/users.model');

const createDesign = async (req, res, next) => {
    const { userId } = req.params;
    const { nameDesign, elementType, template, likes, image, defaultContent, defaultStyles, edit } = req.body;

    try {
        if (!userId) {
            return res.status(404).json({ msg: 'ID de usuario no encontrado' });
        }

        const newDesign = new Design({
            userId: userId,
            nameDesign,
            elementType,
            template,
            likes,
            image,
            defaultContent: {
                children: defaultContent.children || [],
                grandson: defaultContent.grandson || [],
                countChildren: defaultContent.countChildren || 0,
                countGrandson: defaultContent.countGrandson || 0,
                tagInfo: defaultContent.tagInfo || null
            },
            defaultStyles,
            edit
        });

        await newDesign.save();

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        user.designs.addToSet(newDesign._id);
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
        const { nameDesign, defaultContent, edit } = req.body;
        
        const updatedDesign = await Design.findByIdAndUpdate(designId, { nameDesign, defaultContent, edit }, { new: true });
        
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

const getUserDesigns = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const designs = await Design.find({
            user: userId
        }).populate('tickets');
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

const likeSystem = async (req, res, next) => {
    const { designId, userId } = req.params;
  
    try {
      const design = await Design.findById(designId);
  
      if (!design) {
        return res.status(404).json({ msg: 'Diseño no encontrado' });
      }
  
      const isLiked = design.likes.includes(userId);
  
      if (isLiked) {
        design.likes = design.likes.filter(id => id.toString() !== userId);
      } else {
        design.likes.push(userId);
      }
  
      await design.save();
  
      res.status(200).json({ msg: 'Like actualizado correctamente', data: design.likes });
    } catch (error) {
      next(error);
    }
  };
  

module.exports = {createDesign, removeDesign, editDesign, getAllDesigns, getDesignById, getUserDesigns, likeSystem};
