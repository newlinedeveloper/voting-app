const jwt = require("jwt-simple");

const generateToken = (user) => {
  
  let token = jwt.encode(
    {
      id: user._id,
    },
    process.env.SECRET
  );

  return {
    token,
    user,
  };
};

module.exports = { generateToken };
