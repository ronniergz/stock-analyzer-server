require("./api/data/db.js");
const mongoose = require("mongoose");
const Equity = require("./api/data/models/equity");
const User = require("./api/data/models/user");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const scrape = require("./scrapeQuote.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express!" });
});

/*-------------    Users   -----------------*/

// Return a list of all users
app.get("/api/users", (req, res) => {
  User.find().exec(function (err, users) {
    console.log("Found users", users.length);
    res.json(users);
  });
});

// Return a specific user
app.get("/api/users/:userId", (req, res) => {
  let id = req.params.userId;
  User.findById(id).exec(function (err, user) {
    res.json(user);
  });
});

/*-------------   Equities   -----------------*/

// Return a list of all equities
app.get("/api/equities", (req, res) => {
  Equity.find().exec(function (err, equities) {
    console.log("Found equities", equities.length);
    res.json(equities);
  });
});

// Add an equity
app.post("/api/equities", (req, res) => {
  Equity.create(
    {
      symbol: req.body.symbol,
    },
    function (err, equity) {
      if (err) {
        console.log("Error creating equity");
        res.status(400).json(err);
      } else {
        console.log("Equity added", equity);
        res.status(201).json(equity);
      }
    }
  );
});

// Return a specific equity
app.get("/api/equities/:equityId", (req, res) => {
  let id = req.params.equityId;
  Equity.findById(id).exec(function (err, equity) {
    res.json(equity);
  });
});

// Get current equity data
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

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

process.once("SIGUSR2", function () {
  server.close(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
