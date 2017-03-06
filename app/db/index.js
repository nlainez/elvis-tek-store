'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// logging errors if connection fails
Mongoose.connection.on('error', error => {
  console.log("MongoDB error: ", error);
});

// create schema that defines the structure for storing user data
const elvisTekUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String,
  isAdmin: {
    type: Boolean,
    default: false
  } 
});

// create schema that defines the structure for storing products data
const elvisTekProduct = new Mongoose.Schema({
  productName: String,
  price: Number,
  amount: Number,
  like: {
    type: Number,
    default: 0
  }
});

// create schema that defines the structure for storing sells data
const elvisTekSell = new Mongoose.Schema({
  productID: String,
  sellingUnits: Number,
  sellingCost: Number
});

// turning schemas into usable models
let userModel = Mongoose.model('elvistekusers', elvisTekUser);
let productModel = Mongoose.model('products', elvisTekProduct);
let sellModel = Mongoose.model('elvisteksell', elvisTekSell);

module.exports = {
  Mongoose,
  userModel,
  productModel,
  sellModel
};