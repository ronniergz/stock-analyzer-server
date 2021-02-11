//require('./api/data/db.js');
//const mongoose = require('mongoose');
//const Equity = require('./api/data/models/equity');
//const User = require('./api/data/models/user');

const bodyParser = require('body-parser');
const cors = require('cors');
const scrape = require('./scrapeQuote.js');
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

//const port = process.env.PORT || 5000;

const credentials = {
  cert: fs.readFileSync('/etc/letsencrypt/live/stock-analyzer.xyz/fullchain.pem',`utf-8`),
  key: fs.readFileSync('/etc/letsencrypt/live/stock-analyzer.xyz/privkey.pem', 'utf-8')
};
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(5000)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*///////////     Future REST API      //////////////////*/

/*-------------    Users   -----------------*/

// Return a list of all users
app.get('/api/users', (req, res) => {
  User.find().exec(function (err, users) {
    console.log('Found users', users.length);
    res.json(users);
  });
});

// Add a new user
app.post('/api/users', (req, res) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  User.create(newUser, function (err, user) {
    if (err) {
      console.log(`Error adding new user`, err);
      res.status(400).json(err);
    } else {
      console.log(`Added new user`, user);
      res.status(201).json(user);
    }
  });
});

// Get a specific user
app.get('/api/users/:userId', (req, res) => {
  let id = req.params.userId;
  User.findById(id).exec(function (err, user) {
    res.json(user);
  });
});

// Update specific user
app.put('/api/users/:userId', (req, res) => {
  let updatedUser = {};
  if (req.body.username) updatedUser.username = req.body.username;
  if (req.body.password) updatedUser.password = req.body.password;
  User.findByIdAndUpdate(req.params.userId, updatedUser, {new: true}, function (err, user) {
    if (err) {
      console.log(`Error updating new user`, err);
      res.status(400).json(err);
    } else {
      console.log(`updated new user`, user);
      res.status(201).json(user);
    }
  });
});

// Delete a specific user
app.delete('/api/users/:userId', (req, res) => {
  let id = req.params.userId;
  User.findByIdAndRemove(id).exec(function (err, user) {
    if (err) {
      res.status(404).json(err);
    } else {
      console.log('User deleted, id:', id);
      res.status(204).json(user);
    }
  });
});

// Return a specific user's watchlist
app.get('/api/users/:userId/watchlist', (req, res) => {
  User.findById(req.params.userId).exec(function (err, user) {
    res.json(user.wishlist);
  });
});

// Add a new equity to user's watchlist
app.post('/api/users/:userId/watchlist', (req, res) => {
  let newEquity = {
    symbol: req.body.symbol,
    growth: req.body.growth,
    futpe: req.body.futpe,
  };
  User.findByIdAndUpdate(req.params.userId, {$push: {wishlist: newEquity}}, {new: true}).exec(function (err, user) {
    console.log(`Added new equity to user's watchlist`, user.wishlist);
    res.json(user);
  });
});

// Get specific item on user's watchlist
app.get('/api/users/:userId/watchlist/:equityId', (req, res) => {
  User.findById(req.params.userId)
    .select('wishlist')
    .exec(function (err, user) {
      let equity = user.wishlist.id(req.params.equityId);
      res.status(200).json(equity);
    });
});

// Update item on user's watchlist
app.put('/api/users/:userId/watchlist/:equityId', (req, res) => {
  User.findById(req.params.userId)
    .select('wishlist')
    .exec(function (err, user) {
      let equity = user.wishlist.id(req.params.equityId);
      if (req.body.growth) equity.growth = req.body.growth;
      if (req.body.futpe) equity.futpe = req.body.futpe;
      if (err) {
        console.log(`Error updating new user`, err);
        res.status(400).json(err);
      } else {
        console.log(`updated new user`, user);
        res.status(201).json(user);
      }
    });
});

// Delete item on user's watchlist
app.delete('/api/users/:userId/watchlist/:symbol', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {$pull: {wishlist: {symbol: req.params.symbol}}}, {new: true}).exec(function (err, user) {
    console.log(`Removed equity from user's watchlist`, user.wishlist);
    res.json(user);
  });
});

/*///////////                        //////////////////*/

/*---------------  Web Scraper  ---------------*/

// Get current equity data
app.get('/api/scrape', cors(), (req, res) => {
  scrape(req.query.symbol).then((value) => {
    res.send(value);
  });
});

//const server = app.listen(port, () => console.log(`Listening on port ${port}`));

process.once('SIGUSR2', function () {
  httpsServer.close(function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
