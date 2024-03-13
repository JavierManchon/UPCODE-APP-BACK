const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');
const Product = require('./products.model');

// Método para recuperar todos los productos de la DB
const getAll = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
}

// Método para recuperar un producto de la DB por su id
const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
}

// Método para crear un nuevo producto
const postOne = async (req, res, next) => {
    try {
        const image = req.file ? req.file.path : null
        const { name, description, price, category } = req.body;
        const newProduct = new Product({ name, description, price, category, image });
        const productDB = await newProduct.save();
        return res.status(201).json(productDB);
    } catch (error) {
        return next(error);
    }
}

// Método para modificar un producto en base a su id
const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, image } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, image }, { new: true });
        
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return next(error);
    }
}

// Método para eliminar un producto en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct.image) deleteImgCloudinary(deletedProduct.image)
        return res.status(200).json(deletedProduct);
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}
