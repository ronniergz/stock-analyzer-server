var mongoose = require("mongoose");

var equitySchema = new mongoose.Schema({
  symbol: {
    type: String,
  },
  growth: {
    type: Number,
  },
  futpe: {
    type: Number,
  },
});

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  wishlist: [equitySchema],
});

userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.wishlist = undefined;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
