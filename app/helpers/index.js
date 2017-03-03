'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

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

// Create a new user and returns that instanceof
let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newElvisTekUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photo[0].value || ""
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

module.exports = {
  findById,
  findOne,
  createNewUser
};