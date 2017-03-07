'use strict';
const h = require('../helpers');
const db = require('../db');
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
        h.findElvistekProducts()
          .then(elvistekProducts => {
            res.render('home', {
              user: req.user,
              host: config.host,
              products: elvistekProducts
            });
          });
      },
      '/users': (req, res, next) => {
        h.findElvistekUsers()
          .then(elvistekUsers => {
            res.render('users', {
              user: req.user,
              host: config.host,
              users: elvistekUsers
            });
          });
      },
      '/addProducts': (req, res, next) => {
        res.render('addProducts', {
          user: req.user,
          host: config.host
        });
      },
      '/editProduct/:id': (req, res, next) => {
        h.findProductById(req.params.id)
          .then(product => {
            res.render('editProduct', {
              user: req.user,
              host: config.host,
              product: product
            });
          });
      },
      '/buyProduct/:id': (req, res, next) => {
        h.findProductById(req.params.id)
          .then(product => {
            res.render('buyProduct', {
              user: req.user,
              host: config.host,
              product: product
            });
          });
      },
      '/editUser/:id': (req, res, next) => {
        h.findOne(req.params.id)
          .then(editUser => {
            res.render('editUser', {
              user: req.user,
              host: config.host,
              editUser: editUser
            });
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
    'post': {
      '/addProducts': (req, res, next) => {
        h.createNewProduct(req.body.product);
        res.redirect('/home');
      },
      '/likeProduct/:id': (req, res, next) => {
        h.incrementLike(req.params.id);
        res.redirect('/home');
      },
      '/deleteProduct/:id': (req, res, next) => {
        h.deleteProduct(req.params.id);
        res.redirect('/home');
      },
      '/deleteUser/:id': (req, res, next) => {
        h.deleteUser(req.params.id);
        res.redirect('/users');
      },
      '/editUser/:id': (req, res, next) => {
        h.editUser(req.params.id, req.body.user.isAdmin);
        res.redirect('/users');
      },
      '/editProduct/:id': (req, res, next) => {
        h.editProduct(req.params.id, req.body.product);
        res.redirect('/home');
      },
      '/buyProduct/:id': (req, res, next) => {
        h.buyProduct(req.params.id, req.body.product.amount);
        res.redirect('/home');
      }
      
    },

    //////////////// Routes for "put" method
    'put': {},

    //////////////// Routes for "delete" method
    'delete': {
      // '/deleteProduct/:id': (req, res, next) => {
      //   h.deleteProduct(req.params.id);
      //   res.redirect('/home');
      // },
      '/deleteProduct/:id': (req, res, next) => {
        h.deleteProduct(req.params.id);
        res.redirect('/home');
      },
      '/deleteUser/:id': (req, res, next) => {
        h.deleteUser(req.params.id);
        res.redirect('/users');
      }
    },

    //////////////// Route for routes that do not belong to this webapp
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.htm');
    }
  };

  return h.route(routes);
};
