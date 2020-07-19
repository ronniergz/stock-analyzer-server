import React, { Component } from 'react';
import { Link, Switch, Route, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import Header from './components/HeaderComponent';
import Home from './components/HomeComponent';
import WishList from './components/WishListComponent';
import TradeCalc from './components/TradeCalcComponent';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    
    const HomePage = () => { return <Home />};
    const WishListPage = () => { return <WishList />};
    const TradeCalcPage = () => { return <TradeCalc />};
    
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/wish-list' component={WishListPage} />
            <Route exact path='/trade-calc' component={TradeCalcPage} />
            <Redirect to='/home' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
