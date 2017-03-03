'use strict';
const h = require('../helpers');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
  let routes = {
    //////////////// Routes for "get" method
    'get': {
      '/': (req, res, next) => {
        res.render('login');
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