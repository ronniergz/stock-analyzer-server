import React, { Component } from 'react';
import Equity from './EquityComponent';
import { useTable } from 'react-table';
import users from '../data/data.json';
import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 10px;
  border: 1px solid gray;  
`;

class WishList extends Component {
  
  render() {

    return (
      <div>
        <h1>Wish List Component</h1>
        <h4><a href="/home">Home</a></h4>
        <h4><a href="/trade-calc">Trade Calculator</a></h4>
        {users[0].wishlist.map((stock)=> {
          return <Equity symbol={stock} /> 
        })}
      </div>        
    );
  }
}


export default WishList;
