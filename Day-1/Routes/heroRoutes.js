const express = require("express")
const { HeroModel } = require("../Model/heroModel")

const heroRouter = express.Router()

heroRouter.get("/all", async(req, res)=>{
try {
    const allData = await HeroModel.find()
    res.send(allData)
} catch (error) {
    res.send(error)
}
})

module.exports = {heroRouter}