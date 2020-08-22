var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  growth: {
    type: Number,
    required: true,
  },
  futpe: {
    type: Number,
    required: true,
  },
});
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [itemSchema],
});

module.exports = mongoose.model("User", userSchema);
