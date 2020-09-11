import React, { Component } from 'react';
import styled from 'styled-components';
import LinkButton from './LinkButtonComponent';
import ListIcon from './ListIconComponent';
import ChartIcon from './ChartIconComponent';
import { Theme } from './theme';

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  max-width: 400px;
  color: ${Theme.textDark};
`;

const NavItem = styled.div`
  margin-top: 10vh;
  text-align: center;
  border: 1px gray;
`;

const IconWrapper = styled.div`
  height: 100px;
  width: 100px;
  margin: 1rem auto;
  display: block;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: null };

  }

  render() {
    return (
      <Container>
        <NavItem>
          <IconWrapper>
            <ListIcon fill={Theme.textDark} />
          </IconWrapper>
          <p>Easily keep track of you favorite stocks and see when it's time to buy!</p>
          <LinkButton href='/wish-list' text="Watch List" margin="auto" color={Theme.textLight} colorBg={Theme.secondary} />
        </NavItem>
        <NavItem>
          <IconWrapper>
            <ChartIcon fill={Theme.textDark} />
          </IconWrapper>
          <p>Analyze trades for short and long term positions.</p>
          <LinkButton href='/trade-calc' text="Trade Calculator" margin="auto" color={Theme.textLight} colorBg={Theme.secondary} />
        </NavItem>
      </Container>
    );
  }
}

export default Home;
