'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');
const mongodb = require('mongodb');

let _registerRoutes = (routes, method) => {
  for(let key in routes) {
    if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      // Registering the routes
      if(method === 'get') {
        router.get(key, routes[key]);
      } else if(method === 'post') {
        router.post(key, routes[key]);
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
  return db.userModel.find({}, function(error, data) {
    if(error) {
      console.log(error);
    } else {
      return data;
    }
  });
}

// Find the products to display in app
let findElvistekProducts = () => {
  return db.productModel.find({}, function(error, data) {
    if(error){
      console.log(error);
    } else {
      return data;
    }
  });
};

// Find product by id
let findProductById = productID => {
  return db.productModel.findOne({_id: new mongodb.ObjectID(productID)}, function(error, data) {
    if(error){
      console.log(error);
    } else {
      return data;
    }
  });
};

// Find existing user by id
// let findUserById = profileID => {
//   return db.userModel.findOne({'profileId': profileID}, function(error, data) {
//     if(error) {
//       console.log(error);
//     } else {
//       return data;
//     }
//   });
// };

// Delete specific product
let deleteProduct = productID => {
  db.productModel.remove({ _id: new mongodb.ObjectID(productID)}, function(error) {
    if(error) {
      console.log(error);
    } else {
      return;
    }
  });
};

// Delete specific user
let deleteUser = profileID => {
  db.userModel.remove({ _id: new mongodb.ObjectID(profileID)}, function(error) {
    if(error) {
      console.log(error);
    } else {
      return;
    }
  });
};

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

// Find one product and update with new data
let editProduct = (productID, product) => {
  // {
  //   $inc: {amount: product.amount}
  // },
  let newAmount = parseInt(product.amount);
  let currentAmount = 0;
  db.productModel.findOne({_id: new mongodb.ObjectID(productID)}, function (error, result) {
    if(error) {
      console.log(error);
    } else {
      currentAmount = parseInt(result.amount);
      newAmount += currentAmount;

      db.productModel.findOneAndUpdate( {_id: new mongodb.ObjectID(productID)}, {
        productName: product.productName,
        price: product.price,
        amount: newAmount
      }, function(error, data) {
        if(error){
          console.log(error);
        } else {
          return data
        }
      });
    }
  });
};

// Increment one "like" on a specific product
let incrementLike = productID => {
  return db.productModel.findOneAndUpdate({_id: new mongodb.ObjectID(productID)}, {$inc: { like: 1 }}, function(error, data) {
    if(error){
      console.log(error);
    } else {
      return data;
    }
  });
  //return db.productModel.findByIdAndUpdate();
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
  findElvistekProducts,
  findProductById,
  incrementLike,
  deleteProduct,
  deleteUser,
  editProduct,
  isAuthenticated
};
