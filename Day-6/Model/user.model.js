const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email : {type:String},

})

const UserModel = mongoose.model("authuser", userSchema)

module.exports = {UserModel}