const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    res.render('auth/signin');
  },

  signup(req, res) {
    res.render('auth/signup');
  },

  passwordRecover(req, res) {
    res.render('auth/passwordRecover');
  },

  async register(req, res, next) {
    try {
      const { email, retypePassword } = req.body;
      let { password } = req.body;

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.saveAndRedirect('back');
      }

      if (password !== retypePassword) {
        req.flash('error', 'Passwords não conferem');
        return res.saveAndRedirect('back');
      }

      password = await bcrypt.hash(req.body.password, 5);

      await User.create({ ...req.body, password });

      req.flash('success', 'Usuário cadastrado com sucesso');
      return res.saveAndRedirect('/');
    } catch (err) {
      return next(err);
    }
  },

  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error', 'Usuário inexistente');
        return res.saveAndRedirect('back');
      }

      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Senha incorreta');
        return res.saveAndRedirect('back');
      }

      req.session.user = user;

      return req.session.save(() => {
        res.saveAndRedirect('app/dashboard');
      });
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
