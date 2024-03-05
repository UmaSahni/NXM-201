const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
  name: String,
  powers: [String],
  health: Number,
  villains: [
    {
      name: String,
      health: Number,
    },
  ],
  metadata: {
    favouriteColor: String,
    age: Number,
  },
});

const HeroModel = mongoose.model("hero", heroSchema)

module.exports = {HeroModel}
