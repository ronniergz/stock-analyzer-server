const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function scrape(symbol) {
  async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  const $ = await fetchHTML("https://finance.yahoo.com/quote/" + symbol);

  const rawPrice = $("#quote-header-info").find("[data-reactid~=14]").text();
  const rawEps = $("#quote-summary").find("[data-reactid~=119]").text();
  const rawPe = $("#quote-summary").find("[data-reactid~=124]").text();

  return {
    Price: rawPrice,
    EPS: rawEps,
    PE: rawPe,
  };
};
