import React, { Component } from "react";
import Equity from "./EquityComponent";
import users from "../data/data.json";

class WishList extends Component {
  render() {
    return (
      <div>
        <h1>Wish List Component</h1>
        <h4>
          <a href="/home">Home</a>
        </h4>
        <h4>
          <a href="/trade-calc">Trade Calculator</a>
        </h4>
        {users[0].wishlist.map((stock, i) => {
          return <Equity symbol={stock} key={i} />;
        })}
      </div>
    );
  }
}

export default WishList;
