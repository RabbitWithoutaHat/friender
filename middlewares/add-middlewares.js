const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Usage of FileStore leads to problem of not login in from the first time?

const bcrypt = require('bcrypt');
// const connection = require('../models/connection');
const User = require('../models/User');

function addMiddlewares(router) {
  // configure passport.js to use the local strategy
  passport.use(
    new LocalStrategy({ usernameField: 'login' }, async (login, password, done) => {
      const foundUsers = await User.getByLogin(login);
      if (foundUsers.length === 0) {
        return done('Error. Login not found!');
      }
      const isPasswordCorrect = await bcrypt.compare(password, foundUsers[0].password);
      if (isPasswordCorrect) {
        const user = {
          id: foundUsers[0].id,
          login: foundUsers[0].login,
        };
        return done(null, user);
      }
      return done('Error. Password not correct!');
    }),
  );

  router.use(express.urlencoded({ extended: false })); // Form data

  router.use(express.json()); // JSON

  router.use(passport.initialize());

  router.use(passport.session());

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    console.log('serializeUser: user:', user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser: id:', id);
    const user = await User.findById(id);
    done(null, user);
  });
}

module.exports = addMiddlewares;
