import React, { Component } from 'react';
import styled from 'styled-components';

const AppFooter = styled.div`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

class Footer extends Component {

  render() {

    return (
      <AppFooter>
        
      </AppFooter>
    );
  }
}

export default Footer;