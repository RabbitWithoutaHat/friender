const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('./../models/User');
// const homePageWithNotification = require('../helpers/homePageWithNotification');
// const notifications = require('../constants/notification-types');
const addMiddlewares = require('../middlewares/add-middlewares');
// const { getUserLogin } = require('../helpers/reqHelpers');
// const { saltRounds } = require('../constants/other-constants');
const { sessionChecker } = require('../middlewares/auth');

const router = express.Router();
addMiddlewares(router);

// GET login form
// router.get('/isAuthorize', sessionChecker, (req, res) => {
//   console.log(req.user);
//   res.send(req.user);
// });

// POST login
router.post('/login', async (req, res, next) => {
  const { position } = req.body;
  const { lat } = position;
  const { lng } = position;
  console.log(req.body);
  await User.update({ login: req.body.login }, { $set: { position: { lat, lng } } });
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

// GET registration form
router.get('/signup', (req, res) => {
  res.send('true');
});

// POST new user
router.post('/signup', async (req, res) => {
  const {
 login, password, title, content, position 
} = req.body;
  const curLogin = await User.getByLogin(login);
  if (curLogin.length === 0) {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      login,
      password: hash,
      title,
      content,
      position,
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
router.post('/usersPosition', async (req, res) => {
  const usersArray = await User.find({});
  const usersPosition = [];
  usersArray.forEach((user) => {
    usersPosition.push({ position: user.position, content: user.content, title: user.title });
  });
  console.log(usersArray);

  res.send(usersPosition);
});

router.post('/new', sessionChecker, async (req, res, next) => {
  const { title, content } = req.body;
  console.log(req.user.login);
  // console.log(req.body);
  await User.update({ _id: req.user.id }, { $set: { title, content } });

  return res.send(req.user);
});

module.exports = router;
