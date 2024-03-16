var jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      let extractToken = token.split(" ")[1];
      // Check if token is present in blacklist array
      if (blacklist.includes(extractToken)) {
        res.send("Unauthorized. Please login");
      }

      var decoded = jwt.verify(extractToken, "masai");
      // console.log(decoded)
      next();
    } else {
      res.send({ msg: "Token not found" });
    }
  } catch (error) {
    res.status(401).send({ msg: "Unauthorised Token", err: err.message });
  }
};

module.exports = { auth };
