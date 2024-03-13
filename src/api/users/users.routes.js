const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { register, login, logout, confirm,  newPassword, isAdmin} = require('./users.controllers');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.get('/is-admin', isAdmin);
UserRoutes.get("/confirm-user/:token", confirm);
UserRoutes.get('/logout', [isAuth], logout);

module.exports = UserRoutes;