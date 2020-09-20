import React from 'react';
import styled from 'styled-components';
import {Theme} from './theme.js';

// Background color darkens by 20% on hover and lightens by 20% on disabled

const darkenColor = (color, percentage) => {
  let colorArray = color.split(' '); // separate values into array
  let lightness = colorArray[2]; // get lightness value
  let newLightness = lightness.slice(0, 2) * (1 - percentage); // decrease lightness string
  colorArray.splice(2, 1, newLightness + '%,'); // insert new lightness value into array
  return colorArray.join(' '); // join array into new string and return
};

const Link = styled.button`
  font-family: ${Theme.fontPrimary};
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  color: ${(props) => props.color};
  border-width: 0;
  border-radius: 0.25rem;
  display: block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  transition: transform 1s ease;
  &:disabled {
    background-color: ${(props) => (props.colorBg ? darkenColor(props.colorBg, -0.3) : props.colorBg)};
  }
  &:enabled {
    background-color: ${(props) => props.colorBg};
    &:hover {
      text-decoration: none;
      background-color: ${(props) => (props.colorBg ? darkenColor(props.colorBg, 0.2) : props.colorBg)};
    }
  }
`;

const LabelText = styled.span`
  line-height: ${(props) => props.height};
  text-align: center;
`;

const FormButton = (props) => {
  return (
    <Link
      type={props.type}
      color={props.color}
      colorBg={props.colorBg}
      margin={props.margin}
      padding={props.padding}
      height={props.height}
      width={props.width}
      fontSize={props.fontSize}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <LabelText height={props.height}>{props.text}</LabelText>
    </Link>
  );
};

export default FormButton;
