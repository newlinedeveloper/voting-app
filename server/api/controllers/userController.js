const mongoose = require("mongoose");
const Users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../globals");

const loginUser = (data, callback) => {
  Users.findOne({ email: data.email }, (err, user) => {
    if (err) return callback(err, 500, null);
    else {
      if (user) {
        bcrypt.compare(data.password, user.password, (err, res) => {
          if (err) {
            console.log(err);
            return callback(err, 400, null);
          } else {
            if (res) {
              return callback(null, 200, generateToken(user));
            } else {
              return callback(err, 400, null);
            }
          }
        });
      } else {
        return callback(err, 404, null);
      }
    }
  });
};

const registerUser = (data, callback) => {
  Users.findOne({ email: data.email.toLowerCase() }, (err, user) => {
    if (err) return callback(err, 500, null);
    else {
      if (user) {
        return callback("Email already exists", 400, null);
      } else {    
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return callback(err, 400, null);
            } else {
              let newPassword = hash;
              let newUser = new Users({
                name: data.name,
                email: data.email,
                password: newPassword,
                createdOn: Date.now(),
              });
              newUser
                .save()
                .then((success) => {
                  return callback(null, 200, "User Registered");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        });
      }
    }
  });
};

module.exports = {
  loginUser,
  registerUser,
};
