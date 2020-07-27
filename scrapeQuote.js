  
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function scrape(symbol) {
  async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  const $ = await fetchHTML("https://finance.yahoo.com/quote/" + symbol);

  const rawPrice = $("#quote-header-info>div:nth-child(3)>div:first-child>div:first-child>span:first-child").text();
  const rawEps = $("#quote-summary>div:nth-child(2)>table:first-child>tbody:first-child>tr:nth-child(4)>td:nth-child(2)>span:first-child").text();
  const rawPe = $("#quote-summary>div:nth-child(2)>table:first-child>tbody:first-child>tr:nth-child(3)>td:nth-child(2)>span:first-child").text();

  return {
    Price: rawPrice,
    EPS: rawEps,
    PE: rawPe,
  };
};

// Yahoo XPaths:
//   Price //*[@id="quote-header-info"]/div[3]/div/div/span[1]
//   EPS // *[@id="quote-summary"]/div[2]/table/tbody/tr[4]/td[2]/span
//   PE //*[@id="quote-summary"]/div[2]/table/tbody/tr[3]/td[2]/span

