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
};
