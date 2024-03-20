const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        required: true,
        default : "customer",
        enum : ["customer","seller", "marketer"] //  options
  }
});

const UserModel = mongoose.model("authentication", userSchema);

module.exports = { UserModel };
