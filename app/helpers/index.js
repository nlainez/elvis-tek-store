'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

let _registerRoutes = (routes, method) => {
  for(let key in routes) {
    if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      // Registering the routes
      if(method === 'get') {
        router.get(key, routes[key]);
      } else if(method === 'post') {
        router.post(key, router[key]);
      } else if(method === 'put') {
        router.put(key, routes[key]);
      } else if(method === 'delete') {
        router.delete(key, routes[key]);
      } else {
        router.use(routes[key]);
      }
    }
  }
};

let route = routes => {
  _registerRoutes(routes);
  return router;
};

// The ES6 promosified version of "findById" method
let findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if(error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

// Find a single user based on a key
let findOne = profileID => {
  return db.userModel.findOne({
    'profileId': profileID
  });
};

// Find the users to display in app
let findElvistekUsers = () => {
  return new Promise((resolve, reject) => {
    db.userModel.find({}, (error, users) => {
      if(error){
        reject(error);
      } else {
        resolve(users)
      }
    });
  });
}

// Create a new user and returns that instanceof
let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newElvisTekUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || "",
      isAdmin: false
    });

    newElvisTekUser.save(error => {
      if(error) {
        reject(error);
      } else {
        resolve(newElvisTekUser);
      }
    });
  });
};

// Create a new product and return that instanceof
let createNewProduct = product => {
  return new Promise((resolve, reject) => {
    let newProduct = new db.productModel({
      productName: product.productName,
      price: product.price,
      amount: product.amount,
      like: 0
    });

    newProduct.save(error => {
      if(error){
        reject(error);
      } else {
        resolve(newProduct);
      }
    });
  });
};

// A Middleware that checks to see if the user is authenticated & logged in
let isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) { // "req.isAuthenticated" is a method provided by Passport
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  route,
  findById,
  findOne,
  createNewUser,
  createNewProduct,
  findElvistekUsers,
  isAuthenticated
};