const User = require('../api/users/users.model');
require('dotenv').config();
const JwtUtils = require('../utils/jwt/jwt');


const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        if (!token) {
            res.status(404).json({msg: "El token es invalido o no existe", token: false})
            return 
        }
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