import React, {Component} from 'react';
import styled from 'styled-components';
import {Theme} from './theme';

const AppFooter = styled.div`
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.cancel};
`;

const FooterText = styled.span`
  margin: 0 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${Theme.textLight};
`;

class Footer extends Component {
  render() {
    return (
      <AppFooter>
        <FooterText>{'\u00A9'}2020 ronniergz</FooterText>
      </AppFooter>
    );
  }
}

export default Footer;
