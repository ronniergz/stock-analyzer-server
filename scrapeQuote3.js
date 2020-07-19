const request = require("request");
const cheerio = require("cheerio");
const xpath = require('xpath')
  , dom = require('xmldom').DOMParser

const baseUrl = 'https://finance.yahoo.com/quote/';

module.exports = async function scrape(symbol) {

  request(baseUrl + 'ATHM', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let element = $('Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)');
      // var doc = new dom().parseFromString($)
      // const el1 = xpath.select('//*[@id="quote-header-info"]/div[3]/div/div/span[1]', doc); 
    
      console.log(element);
    }
  });

}
