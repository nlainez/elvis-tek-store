'use strict';
const h = require('../helpers');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
  let routes = {
    //////////////// Routes for "get" method
    'get': {
      '/': (req, res, next) => {
        res.redirect('/home');
      },
      '/home': (req, res, next) => {
        res.render('home', {
          user: req.user,
          host: config.host
        });
      },
      '/addProducts': (req, res, next) => {
        res.render('addProducts', {
          user: req.user,
          host: config.host
        });
      },
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/'
      }),
      '/logout': (req, res, next) => {
        req.logout();
        res.redirect('/');
      }
    },

    //////////////// Routes for "post" method
    'post': {},

    //////////////// Routes for "put" method
    'put': {},

    //////////////// Routes for "delete" method
    'delete': {},

    //////////////// Route for routes that do not belong to this webapp
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.htm');
    }
  };

  return h.route(routes);
};