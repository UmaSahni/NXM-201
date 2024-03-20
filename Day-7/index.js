const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./Routes/user.Routes")
const { auth } = require("./Middleware/auth.middleware")
const app  = express()

app.use(express.json())

const jwt = require ("jsonwebtoken")
const { UserModel } = require("./Models/user.model")
const { role } = require("./Middleware/role")

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

app.get("/", auth, async(req, res)=>{
    try {
       res.send({"msg":"I am in home route"}) 
    } catch (error) {
        res.send({"msg":"Error from the backend"})
    }
})

/*
Will sales data should be accessed by customer ??
No
Lets do now ! 
*/


// Customer


/**
 * 1st Way to do things
 * Not optimal way
 */
// app.get("/products", auth, async (req, res)=>{
    
//     const {userId} = req.body
//     const user = await UserModel.findOne({_id : userId})
  
//     if(user.role === "customer"){
//         res.send("products")
//     }
//     else{
//         res.send("You are not authorised")
//     }
    
// })

app.get("/products", auth, async (req, res)=>{
    const role = req.role
    console.log(role)
    if(role == "customer"){
        res.send("customer Data")
    }else{
        res.send("Not Authorised")
    }
})


// Seller
// app.get("/salesdata", (req, res)=>{
//      const role = req.role
//     console.log(role)
//     if(role == "seller"){
//         res.send("seller Data")
//     }else{
//         res.send("Not Authorised")
//     }
// })

/**
 * Can we optimise this ? What is the repeatative thing we are doing here ?
 * 
 * 
 * Now suppose we have 1 more end points /offers now this offers we should access by both sellers and customer.
 */

/*

app.get("/offers", (req, res)=>{
     const role = req.role
    console.log(role)
    if(role == "customer" || role == "seller"){
        res.send("offers Data")
    }else{
        res.send("Not Authorised")
    }
})

*/

/**
 * This thing is fine. Now we have same endpoint 
 * BUT PATCH request.
 * Now should this end point we be accessiable to customer ?
 * 
 * So we again have to write the role = req.role
 * Already the code becomes messy . The real logic can be very big.
 * 
 * So create a middleware
 */

/*
app.patch("/offers", auth, async (req, res)=>{
    const role = req.role;
    if(role == "seller"){
        Make patch request here
    }
    else{
         you are not authorized
    }
})

*/

// Seller
app.get("/salesdata", auth, role, (req, res)=>{
    
        res.send("seller Data")
   
})

// ** It should be accessed by both customer and seller GET req
app.get("/offers",auth, role, (req, res)=>{
        res.send("offers Data")
})

// ** It should be accessed by seller only PATCH req
app.patch("/offers",auth, role, (req, res)=>{
        res.send("offers Data")
})


app.listen(8080, async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/nxm_201")
        console.log("Connected to database")
        console.log("Port is running is 8080")
    } catch (error) {
        console.log("Unable to connect in the database")
    }
    
})