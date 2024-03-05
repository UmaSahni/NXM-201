const express = require("express")
const { connection } = require("./db");
const { heroRouter } = require("./Routes/heroRoutes");
const app = express()
app.use(express.json()); 

app.use("/hero", heroRouter)

app.listen(8080, async()=>{
    try {
        console.log("Port Running on 8080")
        await connection 
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("Error in running Port")
    }
})