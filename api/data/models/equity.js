var mongoose = require("mongoose");

var equitySchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
  },
  pe: {
    type: Number,
  },
  eps: {
    type: Number,
  },
});

module.exports = mongoose.model("Equity", equitySchema);
