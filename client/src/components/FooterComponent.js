import React, {Component} from 'react';
import styled from 'styled-components';
import LogoIcon from './svg/LogoIconComponent';
import {Theme} from './theme';
import {device} from './device';

const AppFooter = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.cancel};
`;

const FooterText = styled.span`
  margin: 0 1.5rem;
  font-size: 0.25rem;
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
