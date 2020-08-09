const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const usersController = require("../controllers/userController");
const { authenticate, validateUser } = require("../../config");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, OPTIONS, GET, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key, Authorization"
  );
  next();
});

// User Login /users/login
router.post("/login", (req, res) => {
  usersController.loginUser(req.body, (err, status, data) => {
    if (err) {
      res.status(status).send({ err: err, data: null });
    } else {
      res.status(200).send({ err: null, data });
    }
  });
});

// Register a new User /users/register
router.post("/register", (req, res, next) => {
  usersController.registerUser(req.body, (err, status, data) => {
    if (err) {
      res.status(status).send({ err: err, data: null });
    } else {
      res.status(200).send({ err: null, data });
    }
  });
});

module.exports = router;
