const User = require('../api/users/users.model');
require('dotenv').config();
const JwtUtils = require('../utils/jwt/jwt');


const isAuth = async (req, res, next) => {
    try {
            
        // El token se guarda en cabeceras y lo recuperamos de allí
        const token = req.headers.authorization;

        if (!token) {
            res.status(404).json({msg: "El token es invalido o no existe", token: false})
            return 
        }
        // Asi nos llega de la cabecera 
        // Bearer TOKEN
        const parsedToken = token.replace('Bearer ', '');
        const validToken = JwtUtils.verifyToken(parsedToken, 'KVGfjghdjJJKHLH-43543T-VJHFDSKVJHSFDJK-45646FDGVF');
        const userLogued = await User.findById(validToken.id);
        req.user = userLogued;
        next();
    } catch (error) {
        error.statusToken = 'unauthorized'
        return next(error)
    }
}

module.exports = { isAuth }