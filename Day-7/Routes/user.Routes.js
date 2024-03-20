const express = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const { auth } = require("../Middleware/auth.middleware");

userRouter.post("/signup", async (req, res) => {
  const { email, password , role} = req.body;
  console.log(req.body)
  try {
    // Check if user already exists
    const userExits = await UserModel.findOne({email})
    if(userExits){
      return res.status(400).json({message:"User Already exits"})
    }

    // Create a new User
    bcrypt.hash(password, 2, async function (err, hash) {
      if (hash) {
        const user = await new UserModel({ email, password: hash , role});
        await user.save();
        res.json({ msg: "User register successfull", user });
      }
    });
  } catch (error) {
    res.send({error:error.message})
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
          const token = jwt.sign( { userId: user.id }, "masai",{ expiresIn: 1900 },{ algorithm: "HS256" }
          );

          // Give refresh token
          const refreshToken = jwt.sign(  { userId: user.id },"masaiRefresh",  { expiresIn: 550 },  { algorithm: "HS256" }
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
