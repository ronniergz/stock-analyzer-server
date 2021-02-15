import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Home from './components/HomeComponent';
import WatchList from './components/WatchListComponent';
import TradeCalc from './components/TradeCalcComponent';
import styled from 'styled-components';

import './App.css';

const Body = styled.div`
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Body className="App">
          <Header />
          <Switch>
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/watch-list" render={() => <WatchList />} />
            <Route exact path="/trade-calc" render={() => <TradeCalc />} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </Body>
      </BrowserRouter>
    );
  }
}

export default App;
