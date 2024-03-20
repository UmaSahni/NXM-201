var jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const { UserModel } = require("../Models/user.model");
const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      let extractToken = token.split(" ")[1];
    
      // Check if token is present in blacklist array
      if (blacklist.includes(extractToken)) {
        res.send("Unauthorized. Please login");
      }

      const decoded = jwt.verify(extractToken, "masai");
      const {userId} = decoded

const user = await UserModel.findOne({_id : userId})
const role = user?.role

/**
 * We have got user and role.
 * How to pass something From 1 middleware to another middleware.
 */

      req.role = role


      req.body.userId = decoded.userId
      // console.log(decoded, "This is here in auth middleware")
      next();
    } else {
      res.send({ msg: "Token not found" });
    }
  } catch (error) {
    res.status(401).send({ msg: "Unauthorised Token", err: error.message });
  }
};

module.exports = { auth };
