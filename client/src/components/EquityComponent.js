import React, { Component } from "react";

class Equity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      rawPrice: "",
      rawEps: "",
      rawPE: "",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return { symbol: props.symbol };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("http://192.168.1.82:5000/api/scrape?symbol=" + this.state.symbol)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then((data) =>
          this.setState({
            Price: data.Price,
            Eps: data.EPS,
            Pe: data.PE,
          })
        );
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    return (
      <div>
        <h4>{this.state.symbol}</h4>
        <p>{this.state.Price}</p>
        <p>{this.state.Eps}</p>
        <p>{this.state.Pe}</p>
      </div>
    );
  }
}

export default Equity;
