import React, { Component } from "react";
import Equity from "./EquityComponent";
import users from "../data/data.json";
import styled from "styled-components";

const Container = styled.div`
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1rem;
`;

const Table = styled.div`
  display: table;
  width: 90%;
  margin: 0 auto;
`;

const TableHeading = styled.div`
  display: table-header-group;
  background-color: #ddd;
  font-weight: bold;
`;
const TableHead = styled.div`
  display: table-cell;
  padding: 3px 10px;
  border: 1px solid #999999;
`;

const TableBody = styled.div`
  display: table-row-group;
`;

class WishList extends Component {
  render() {
    return (
      <Container>
        <h1>Wish List Component</h1>
        <h4>
          <a href="/home">Home</a>
        </h4>
        <h4>
          <a href="/trade-calc">Trade Calculator</a>
        </h4>
        <Table>
          <TableHeading>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>P/E</TableHead>
            <TableHead>EPS</TableHead>
            <TableHead>Growth</TableHead>
            <TableHead>MOS</TableHead>
          </TableHeading>
          <TableBody>
            {users[0].wishlist.map((stock, i) => {
              return <Equity symbol={stock.symbol} growth={stock.growth} key={i} />;
            })}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default WishList;
