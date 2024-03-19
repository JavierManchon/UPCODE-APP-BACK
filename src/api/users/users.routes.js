const express = require('express');
const UserRoutes = express.Router();
const { register, login, logout, confirm, newPassword, isAdmin, getUserByToken, patchUser } = require('./users.controllers');
const { isAuth } = require('../../middlewares/auth.middleware');

UserRoutes.post('/register', register); // Registro de usuario
UserRoutes.post('/login', login); // Inicio de sesión de usuario
UserRoutes.get('/logout', [isAuth], logout); // Cierre de sesión de usuario (requiere autenticación)
UserRoutes.get('/confirm-user/:token', confirm); // Confirmación de usuario
UserRoutes.patch('/newPassword/:token', newPassword); // Actualización de contraseña de usuario
UserRoutes.get('/is-admin', [isAuth], isAdmin); // Verificación de si el usuario es administrador (requiere autenticación)
UserRoutes.get('/user', [isAuth], getUserByToken); // Obtener información de usuario por token (requiere autenticación)
UserRoutes.patch('/user/:id', [isAuth], patchUser); // Actualizar información de usuario por ID (requiere autenticación)

module.exports = UserRoutes;
