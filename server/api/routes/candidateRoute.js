const express = require("express");
const querystring = require("querystring");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { authenticate, validateAdmin, validateUser } = require("../../config");
const bcrypt = require("bcryptjs");
const candidateController = require("../controllers/candidateController");

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
router.post("/login", authenticate, (req, res) => {
  candidateController.loginCandidate(req.body, (err, status, data) => {
    if (err) {
      res.status(status).send({ err: err, data: null });
    } else {
      res.status(200).send({ err: null, data });
    }
  });
});

// Register a new User /users/register
router.post("/register", (req, res, next) => {
  candidateController.registerCandidate(req.body, (err, status, data) => {
    if (err) {
      res.status(status).send({ err: err, data: null });
    } else {
      res.status(200).send({ err: null, data });
    }
  });
});

// Delete a User /users/delete/:userId
router.post(
  "/delete/:userId",
  [authenticate],
  (req, res, next) => {
    candidateController.deleteCandidate(req.params.userId, (err, status, data) => {
      if (err) {
        res.status(status).send({ err: err, data: null });
      } else {
        res.status(200).send({ err: null, data });
      }
    });
  }
);

// Fetch all Users /users/fetch/all
router.get(
  "/fetch/all/:paginate",
//   [authenticate],
  (req, res) => {
    candidateController.fetchCandidates(req.params.paginate, (err, status, data) => {
      if (err) {
        res.status(status).send({ err: err, data: null });
      } else {
        res.status(200).send({ data });
      }
    });
  }
);

// Updating a User /users/update
router.post("/update",
 [authenticate],
  (req, res, next) => {
  candidateController.updateCandidate(req.body, (err, status, data) => {
    if (err) {
      res.status(status).send({ err: err, data: null });
    } else {
      res.status(200).send({ err: null, data });
    }
  });
});

router.get(
    "/fetch/details/:candidateId",
    [authenticate],
    (req, res) => {
      candidateController.fetchCandidateById(
        req.params.candidateId,
        (err, status, data) => {
          if (err) {
            res.status(status).send({ err: err, data: null });
          } else {
            res.status(200).send({ data });
          }
        }
      );
    }
  );

module.exports = router;
