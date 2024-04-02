require('dotenv').config();
const jwt = require('jsonwebtoken');


const generateToken = (id, email) => {
    const token = jwt.sign({ id, email }, 'KVGfjghdjJJKHLH-43543T-VJHFDSKVJHSFDJK-45646FDGVF', { expiresIn: '1d' });
    return token
}

const verifyToken = (token) => {
    return jwt.verify(token, 'KVGfjghdjJJKHLH-43543T-VJHFDSKVJHSFDJK-45646FDGVF')
}


module.exports = {
    generateToken,
    verifyToken
};