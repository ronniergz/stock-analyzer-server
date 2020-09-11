import React, { Component } from 'react';
import styled from 'styled-components';
import { Theme } from './theme';

const AppHeader = styled.div`
  background-color: ${Theme.primary};
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${Theme.light};
`;

class Header extends Component {
  render() {
    return (
      <AppHeader>
        <h1>Stock Analyzer</h1>
      </AppHeader>
    );
  }
}

export default Header;
