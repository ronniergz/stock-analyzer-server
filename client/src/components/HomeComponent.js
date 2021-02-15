import React, {Component} from 'react';
import styled from 'styled-components';
import LinkButton from './LinkButtonComponent';
import ListIcon from './svg/ListIconComponent';
import CalcIcon from './svg/CalcIconComponent';
import {Theme} from './theme';
import {device} from './device';

const Container = styled.div`
  margin: 0 auto 10vh auto;
  width: 90%;
  max-width: 400px;
  color: ${Theme.textDark};
  @media ${device.laptop} {
    max-width: 1200px;
    display: flex;
  }
`;

const NavItem = styled.div`
  margin: 10vh auto 0 auto;
  text-align: center;
  border: 1px solid ${Theme.textDark};
  border-radius: 0.25rem;
  height: 300px;
  width: 288px;
  @media ${device.mobileL} {
    width: 400px;
  }
  @media ${device.laptop} {
    margin: 20vh 5vw;
    flex: auto;
  }
`;

const NavText = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0 1rem;
  height: 4rem;
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

    this.state = {redirect: null};
  }

  render() {
    return (
      <Container>
        <NavItem>
          <IconWrapper>
            <ListIcon fill={Theme.textDark} />
          </IconWrapper>
          <NavText>Easily keep track of you favorite stocks and see when it's time to buy!</NavText>
          <LinkButton
            href="/watch-list"
            text="Watch List"
            margin="auto"
            color={Theme.textLight}
            colorBg={Theme.secondary}
            height="50px"
            width="250px"
            fontSize="1.2rem"
          />
        </NavItem>
        <NavItem>
          <IconWrapper>
            <CalcIcon fill={Theme.textDark} />
          </IconWrapper>
          <NavText>Analyze trades for short and long term positions.</NavText>
          <LinkButton
            href="/trade-calc"
            text="Trade Calculator"
            margin="auto"
            color={Theme.textLight}
            colorBg={Theme.secondary}
            height="50px"
            width="250px"
            fontSize="1.2rem"
          />
        </NavItem>
      </Container>
    );
  }
}

export default Home;
