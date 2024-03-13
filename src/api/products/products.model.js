// Requerir la librería de mongoose
const mongoose = require('mongoose');
// Creamos un SCHEMA -> Es un método de una clase que nos permite definir un modelo de datos.
const productSchema = new mongoose.Schema(
    // Type: es el tipo de dato
    // Required: si es un campo obligatorio
    // Trim: elimina los espacios al principio y final
    {
        name: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
          },
          category: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
    },
    // Timestamps: fecha de creación - modificación
    {
        timestamps: true
    }
);

// Guardar en Product la referencia y el Schema
// products - es el nombre de mi colección en la DB
const Product = mongoose.model('products', productSchema);
// Exportar ES5
module.exports = Product;