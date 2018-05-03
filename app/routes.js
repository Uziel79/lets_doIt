const express = require('express');

const routes = express.Router();

const authController = require('./controllers/authController');

/* ROUTES AUTH */
routes.get('/', authController.signin);
routes.get('/signup', authController.signup);
routes.get('/recover', authController.passwordRecover);

/* EXPORTANDO AS ROUTES */
module.exports = routes;
