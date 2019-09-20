const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('./../models/User');
const homePageWithNotification = require('../helpers/homePageWithNotification');
const notifications = require('../constants/notification-types');
const addMiddlewares = require('../middlewares/add-middlewares');
const { getUserLogin } = require('../helpers/reqHelpers');
// const { saltRounds } = require('../constants/other-constants');

const router = express.Router();
addMiddlewares(router);

// GET login form
router.get('/login', (req, res) => {
  res.send('true');
});

// POST login
router.post('/login', (req, res, next) => {
  console.log(req.body);

  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.send('false');
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.send('false');
      }
      return res.send(req.user);
    });
  })(req, res, next);
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log(`User ${req.session.passport.user} loged in`);
//   res.send(req.user);
// });

// GET registration form
router.get('/signup', (req, res) => {
  res.send('true');
});

// POST new user
router.post('/signup', async (req, res) => {
  const { login, password } = req.body;
  const curLogin = await User.getByLogin(login);
  if (curLogin.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      login,
      password: hash,
    });
    return res.send('true');
  }
  return res.send('false');
});

// GET user log out
router.get('/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

// GET home page
router.get('/', async (req, res) => {
  const { error, message } = req.query;
  res.send({
    currentUser: getUserLogin(req),
    error,
    message,
  });
});

module.exports = router;
