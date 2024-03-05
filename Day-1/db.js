const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://uma:uma@cluster0.2g009gx.mongodb.net/Superhero?retryWrites=true&w=majority")


module.exports = {connection}