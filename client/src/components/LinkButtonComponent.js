import React, { Component } from "react";
import styled from 'styled-components';

const Link = styled.a`
font-family: Verdana;
font: 1.2rem Verdana, sans-serif;
font-weight: 600;
background-color: ${props => props.colorBg};
color: ${props => props.color};
border-radius: .25rem;
display: block;
width: 250px;
height: 50px;
margin: ${props => props.margin};
transition: transform 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    text-decoration: none;
    color: ${props => props.color};
  }
`;

const LabelText = styled.span`
  line-height: 50px;
  text-align: center;
`;

const LinkButton = (props) => {
  return (
    <Link href={props.href} color={props.color} colorBg={props.colorBg} margin={props.margin}>
      <LabelText>{props.text}</LabelText>
    </Link>
  );
}

export default LinkButton;
