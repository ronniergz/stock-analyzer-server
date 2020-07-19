import React, { Component } from 'react';
import styled from 'styled-components';

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

class Header extends Component {

  render() {

    return (
      <AppHeader>
        <h1>Rule#1</h1>
      </AppHeader>
    );
  }
}

export default Header;