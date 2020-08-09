const jwt = require("jwt-simple");
const Users = require("./api/models/userSchema");

const authenticate = (req, res, next) => {
  if (req.headers["x-key"]) {
    if (req.headers["x-key"] === process.env.APP_KEY) {
      next();
    } else res.status(401).send({ err: "Invalid API Key", data: null });
  } else res.status(401).send({ err: "Key not found", data: null });
};

const validateUser = (req, res, next) => {
  let token = req.header["authorization"];
  if (token) {
    token = token.split(" ")[1];
    try {
      let decoded = jwt.decode(token, process.env.SECRET);
      Users.findOne({ _id: decoded.id }, (err, user) => {
        if (err) {
          res
            .status(500)
            .json({ err: "Cannot Authenticate Token", data: null });
        } else {
          if (user) {
            next();
          }
        }
      });
    } catch (err) {
      res.status(500).json({ err: "Cannot Authenticate Token", data: null });
    }
  } else {
    res.status(401).json({ err: "Token not found for User", data: null });
  }
};

module.exports = {
  authenticate,
  validateUser,
};
