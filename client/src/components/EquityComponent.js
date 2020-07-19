import React, { Component } from 'react';

class Equity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: '',
      values: {}}
  }

  componentWillMount() {
    fetch
  }

  getData(symbol) {
    var xhr = new XMLHttpRequest()
      // get a callback when the server responds
      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
      })
      // open the request with the verb and the url
      xhr.open('GET', 'localhost:5000/api/scrape?symbol=' + symbol)
      // send the request
      xhr.send()
   }

  render() {
    

    return (
      <div>
        <h4>{this.props.symbol}</h4>
        <p>{get}</p>
        <p>{3.25}</p>
        <p>{90.27}</p>
      </div>  
    );
  }
}

export default Equity;
