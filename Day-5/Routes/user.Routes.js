const express = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const { auth } = require("../Middleware/auth.middleware");

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  try {
    bcrypt.hash(password, 2, async function (err, hash) {
      if (hash) {
        const user = await UserModel({ email, password: hash });
        await user.save();
        res.send({ msg: "User register successfull", user });
      }
    });
  } catch (error) {
    res.send({ msg: "Error occurred in signup" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          // true
          // Give token --> 60 --> 1 minutes
          const token = jwt.sign( { foo: "bar" }, "masai",{ expiresIn: 60 },{ algorithm: "HS256" }
          );

          // Give refresh token
          const refreshToken = jwt.sign(  { foo: "bar" },"masaiRefresh",  { expiresIn: 250 },  { algorithm: "HS256" }
          );
          // Here with normal token send the refresh token
          res.send({ msg: "User Logged in", token, refreshToken });
        }
      });
    
    } else {
      res.send({ msg: "User Not found please register." });
    }
  } catch (error) {
    res.send({ msg: "Error in login in" });
  }
});

userRouter.get("/logout", auth, (req, res) => {
  const token = req.headers.authorisation?.split(" ")[1];
  try {
    blacklist.push(token);
    res.send("Logout Successfull");
  } catch (error) {
    res.send("Error i logout route");
  }
});




module.exports = { userRouter };
