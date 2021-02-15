## Stock Analyzer App

React Client with Express for server side web scraping.

App provides a stock 'Watch List' that is stored locally. User can add, remove and edit each item on the list.

The list will automatically calculate a 'fair value' price for each stock based on growth rates projected by the user.

The data for each item on the list is updated whenever the 'Watch List' component is loaded.

A separate 'theme.js' file is used to manage fonts and colors across the app.

### `Cheerio.js`

Cheerio is used for getting current stock data from Yahoo.com
https://cheerio.js.org/

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:4000] for client and (http://localhost:5000) for server to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
