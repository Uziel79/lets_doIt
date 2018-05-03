const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');

// FLASH MESSAGES
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/* ROUTES AUTH */
routes.get('/', controllers.authController.signin);
routes.get('/signup', controllers.authController.signup);
routes.get('/recover', controllers.authController.passwordRecover);

routes.post('/register', controllers.authController.register);
routes.post('/authenticate', controllers.authController.authenticate);

// ROUTES DASHBOARD
routes.get('/app/dashboard', controllers.dashboardController.index);

/* EXPORTANDO AS ROUTES */
module.exports = routes;
