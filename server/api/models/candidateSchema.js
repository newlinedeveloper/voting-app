const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required:  false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

let Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
