const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./Routes/user.Routes")
const { auth } = require("./Middleware/auth.middleware")
const app  = express()
app.use(express.json())
const jwt = require ("jsonwebtoken")
app.use("/user", userRouter)

// We can not use auth middleware. Token is expired 
app.get("/newtoken", (req, res) => {
    const refreshToken = req.headers.authorization?.split(" ")[1]

  try {
    // If refresh token is valid then generate the normal token
    // After 28 days refresh token will be expire so, if condition will fail.
   const decoded = jwt.verify(refreshToken, "masaiRefresh")
   
   if(decoded) { // token is correct
    // generate the new token
     const token = jwt.sign( { foo: "decoded.foo" }, "masai",{expiresIn: 60 },{ algorithm: "HS256" } );
        
     res.send({})
     }
     else{
        res.send("Invalid refresh token please login again")
     }
    
  } catch (error) {
    
  }
});




app.use(auth)
app.get("/", async(req, res)=>{
    try {
       res.send({"msg":"I am in home route"}) 
    } catch (error) {
        res.send({"msg":"Error from the backend"})
    }
})

app.listen(8080, async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/nxm_201?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0")
        console.log("Connected to database")
        console.log("Port is running is 8080")
    } catch (error) {
        console.log("Unable to connect in the database")
    }
    
})