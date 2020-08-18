var mongoose = require("mongoose");

var equitySchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pe: {
    type: Number,
    required: true,
  },
  eps: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Equity", equitySchema);
