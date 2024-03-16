const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./Routes/user.Routes")
const { auth } = require("./Middleware/auth.middleware")
const app  = express()
app.use(express.json())

app.use("/user", userRouter)


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