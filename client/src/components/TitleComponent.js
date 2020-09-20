import React from 'react';
import styled from 'styled-components';
import {Theme} from './theme.js';
import {device} from './device';

const Container = styled.div`
  font-family: ${Theme.fontPrimary};
  font-size: 1rem;
  font-weight: 600;
  background-color: ${(props) => props.colorBg};
  color: ${Theme.textDark};
  border: 
  height: 60px;
  line-height: 70px;
  margin: auto;
  @media ${device.tablet} {
    font-size: 1.2rem;
  }
`;

const Title = (props) => {
  return <Container>{props.text}</Container>;
};

export default Title;
