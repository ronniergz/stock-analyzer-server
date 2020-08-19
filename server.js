require("./api/data/db.js");
const mongoose = require("mongoose");
const Equity = mongoose.model("Equity");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const scrape = require("./scrapeQuote1.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express!" });
});

app.get("/api/equities", (req, res) => {
  Equity.find().exec(function (err, equities) {
    console.log("Found equities", equities.length);
    res.json(equities);
  });
});

app.get("/api/scrape", cors(), (req, res) => {
  scrape(req.query.symbol).then((value) => {
    res.send(value);
  });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
