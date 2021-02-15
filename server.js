const bodyParser = require('body-parser');
const cors = require('cors');
const scrape = require('./scrapeQuote.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is listening on port ', port);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*---------------  Web Scraper  ---------------*/
// Get current equity data
app.get('/api/scrape', cors(), (req, res) => {
  scrape(req.query.symbol).then((value) => {
    res.send(value);
  });
});

// testing
app.get('/api/test', cors(), (req, res) => {
  res.send("Hello!");
});

process.once('SIGUSR2', function () {
  httpsServer.close(function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
