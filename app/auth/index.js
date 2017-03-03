'use strict';
const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Find and fetch user using the _id
    h.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log('Error deserializing the user: ', error));
  });

  // Verifying function
  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // Find user in the local db using profile.id
    // If the user is found, return User data
    // If the user is not found, create one in the local db and return
    h.findOne(profile.id)
      .then(result => {
        if(result) {
          done(null, result);
        } else {
          // Create new user and return
          h.createNewUser(profile)
            .then(newElvisTekUser => done(null, newElvisTekUser))
            .catch(error => console.log('Error on new user creation, \nError: ', error));
        }
      });
  };

  passport.use(new FacebookStrategy(config.fb, authProcessor));
};