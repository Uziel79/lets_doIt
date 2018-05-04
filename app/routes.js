const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const controllers = requireDir('./controllers');

// FLASH MESSAGES
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/* ROUTES AUTH */
routes.get('/', guestMiddleware, controllers.authController.signin);
routes.get('/signup', guestMiddleware, controllers.authController.signup);
routes.get('/recover', guestMiddleware, controllers.authController.passwordRecover);

routes.post('/register', controllers.authController.register);
routes.post('/authenticate', controllers.authController.authenticate);

// ROUTES DASHBOARD
routes.get('/app/dashboard', authMiddleware, controllers.dashboardController.index);

/* EXPORTANDO AS ROUTES */
module.exports = routes;
