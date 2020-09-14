import React, {Component} from 'react';
import styled from 'styled-components';
import {Theme} from './theme.js';

const Link = styled.a`
font-family: ${Theme.fontPrimary}
font-size: ${(props) => props.fontSize};
font-weight: 600;
background-color: ${(props) => props.colorBg};
color: ${(props) => props.color};
border-radius: .25rem;
display: block;
width: ${(props) => props.width};
height: ${(props) => props.height};
margin: ${(props) => props.margin};
transition: transform 0.5s ease;
&:hover {
  text-decoration: none;
  color: ${(props) => props.color};
  cursor: pointer;
  transform: perspective(1px) scale(1.1);    
}
`;

const LabelText = styled.span`
  line-height: ${(props) => props.height};
  text-align: center;
`;

const LinkButton = (props) => {
  return (
    <Link
      href={props.href}
      color={props.color}
      colorBg={props.colorBg}
      margin={props.margin}
      height={props.height}
      width={props.width}
      fontSize={props.fontSize}
    >
      <LabelText height={props.height}>{props.text}</LabelText>
    </Link>
  );
};

export default LinkButton;
