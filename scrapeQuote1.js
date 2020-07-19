const puppeteer = require('puppeteer');

module.exports = async function scrape(symbol) {
  const url = 'https://finance.yahoo.com/quote/';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.setRequestInterception(true);
  
  page.on('request', (req) => {
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort();
      } else { req.continue() }
  });

  await page.goto(url + symbol);

  // Stock Price
  const [el1] = await page.$x('//*[@id="quote-header-info"]/div[3]/div/div/span[1]');
  const price = await el1.getProperty('textContent');
  const rawPrice = await price.jsonValue();

  // EPS
  const [el2] = await page.$x('//*[@id="quote-summary"]/div[2]/table/tbody/tr[4]/td[2]/span');
  const eps = await el2.getProperty('textContent');
  const rawEps = await eps.jsonValue();
  
  // PE Ratio
  const [el3] = await page.$x('//*[@id="quote-summary"]/div[2]/table/tbody/tr[3]/td[2]/span');
  const pe = await el3.getProperty('textContent');
  const rawPe = await pe.jsonValue();

  console.log({rawPrice, rawEps, rawPe});

  browser.close();

  return {
    "Price": rawPrice,
    "EPS": rawEps,
    "P/E": rawPe
  };
}
