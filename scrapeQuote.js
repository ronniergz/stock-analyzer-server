const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function scrape(symbol) {
  async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  const $ = await fetchHTML("https://finance.yahoo.com/quote/" + symbol);

  const rawPrice = $(
    "#quote-header-info>div:nth-child(3)>div:first-child>div:first-child>span:first-child"
  ).text();
  const rawEps = $(
    "#quote-summary>div:nth-child(2)>table:first-child>tbody:first-child>tr:nth-child(4)>td:nth-child(2)>span:first-child"
  ).text();
  const rawPe = $(
    "#quote-summary>div:nth-child(2)>table:first-child>tbody:first-child>tr:nth-child(3)>td:nth-child(2)>span:first-child"
  ).text();

  return {
    Price: rawPrice,
    EPS: rawEps,
    PE: rawPe,
  };
};
