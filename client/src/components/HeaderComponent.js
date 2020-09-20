import React, {Component} from 'react';
import styled from 'styled-components';
import LogoIcon from './svg/LogoIconComponent';
import {Theme} from './theme';
import {device} from './device';

const AppHeader = styled.div`
  font-family: ${Theme.fontPrimary};
  background-color: ${Theme.primary};
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
    height: 13vh;
  }
`;

const HeaderText = styled.h2`
  margin: 0 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${Theme.textLight};
  @media ${device.tablet} {
    margin: 0 3rem;
    font-size: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  height: 50px;
  width: 50px;
  display: block;
  @media ${device.tablet} {
    height: 75px;
    width: 75px;
  }
`;

class Header extends Component {
  render() {
    return (
      <AppHeader>
        <IconWrapper>
          <LogoIcon fillLine={Theme.light} fillBars="gray" fillBorder={Theme.trim} />
        </IconWrapper>
        <HeaderText>Stock Analyzer</HeaderText>
      </AppHeader>
    );
  }
}

export default Header;
