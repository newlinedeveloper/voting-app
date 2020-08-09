const mongoose = require("mongoose");
const Candidate = require("../models/candidateSchema");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../globals");

const loginCandidate = (data, callback) => {
  Candidate.findOne(
    {email: data.email},
    (err, candidate) => {
      if (err) return callback(err, 500, null);
      else {
        if (candidate) {
          bcrypt.compare(data.pass, candidate.password, function (err, res) {
            if (err) console.log(err);
            else {
              if (res) {
                return callback(null, 200, generateToken(candidate));
              } else {
                return callback(err, 400, null);
              }
            }
          });
        } else {
          return callback(err, 404, null);
        }
      }
    }
  );
};

const registerCandidate = (data, callback) => {
  Candidate.findOne({ email: data.email}, (err, candidate) => {
    if (err) return callback(err, 500, null);
    else {
      if (candidate) {
        return callback("Email already exists", 400, null);
      } else {
        let newcandidate = new Candidate({
            name: data.name,
            email: data.email,
            phone: data.phone,
              });
            newcandidate
              .save()
              .then((success) => {
                return callback(null, 200, "candidate Registered");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    }

const fetchCandidates = (paginate, callback) => {
  Candidate.find({})
    .limit(10)
    .skip(10 * (paginate - 1))
    .exec(function (err, candidates) {
      if (err) return callback(err, 500, null);
      else {
        Candidate.count({}, (err, total) => {
          if (err) return callback(err, 500, null);
          else {
            console.log("candidates retrieved");
            let data = { candidates: candidates, totalCandidates: total };
            return callback(null, 200, data);
          }
        });
      }
    });
  };

const deleteCandidate = (candidateId, callback) => {
  console.log(candidateId);
  Candidate.findOne({ _id: candidateId }, (err, candidate) => {
    console.log("candidate find outed")
    if (err)
    { 
      console.log("Error Occured");
      return callback(err, 500, null);
    }
    else {
      Candidate.deleteOne({ _id: candidateId }, (err, success) => {
        console.log("candidate deleted successfully")
        if (err) return callback(err, 500, null);
        else return callback(null, 200, success);
      });
    }
  });
};

const updateCandidate = (data, callback) => {
  Candidate.findOne({ _id: data._id }, (err, candidate) => {
    console.log(data._id)
    if (err) return callback(err, 500, null);
    else {
      Candidate.updateOne(
        { _id: data._id },
        {
          name: data.name,
          phone: data.phone,
        },
        (err, success) => {
          if (err)
          {
            console.log(err);
            return callback(err, 500, null);
          } 
          else{
            console.log("candidate updated successfully")
            return callback(null, 200, success);
          } 
        }
      );
    }
  });
};

const fetchCandidateById = (candidateId, callback) => {
    Candidate.findOne({ _id: candidateId})
      .exec(function (err, candidate) {
        if (err) return callback(err, 500, null);
        else {
              console.log("Candidate retrieved");
              let data = { candidate: candidate};
              return callback(null, 200, data);
        }
      })
    // );
  };




module.exports = {
  
  loginCandidate,
  registerCandidate,
  fetchCandidates,
  deleteCandidate,
  updateCandidate,
  fetchCandidateById

};
