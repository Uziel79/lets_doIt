const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');
const utilsMiddleware = require('./middlewares/utils');

const controllers = requireDir('./controllers');

// Middlewares de utilidades.
routes.use(utilsMiddleware);
// FLASH MESSAGES
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/* ROUTES AUTH */
routes.get('/', guestMiddleware, controllers.authController.signin);
routes.get('/signup', guestMiddleware, controllers.authController.signup);
routes.get('/signout', controllers.authController.signout);
routes.get('/recover', guestMiddleware, controllers.authController.passwordRecover);

routes.post('/register', controllers.authController.register);
routes.post('/authenticate', controllers.authController.authenticate);

routes.use('/app', authMiddleware);
// A PARTIR DAQUI TODAS AS VIEWS PODEM USAR O user.name DA SESSÃO
routes.use((req, res, next) => {
  try {
    res.locals.userName = req.session.user.name;
  } finally {
    next();
  }
});

// ROUTES DASHBOARD
routes.get('/app/dashboard', controllers.dashboardController.index);

/* ROUTES ERRORS */
routes.use((req, res) => res.render('errors/404'));

/* EXPORTANDO AS ROUTES */
module.exports = routes;
