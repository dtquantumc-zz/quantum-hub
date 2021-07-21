// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header/Header.js';
import RightHeaderLinks from './components/Header/RightHeaderLinks.js';
import LeftHeaderLinks from './components/Header/LeftHeaderLinks.js';

import Footer from './components/Footer/Footer.js';
import FooterLinks from './components/Footer/FooterLinks.js';

import Home from "./views/Home";
import Game from "./views/Game";
import Arcade from "./views/Arcade";

function App() {
  /**
   * Routes to different game widgets based on window pathname
   */
  function GenericApp () {
    const route = window.location.pathname
    if (route.startsWith('/app/')) {
      return (<Game widget={route.substr(5, route.length)} live />)
    } else {
      return (<Game live />)
    }
  }
  
  return (
    <div className="App">
      <Router>
        <Header
          color='geeringupPrimary'
          rightLinks={<RightHeaderLinks />}
          leftLinks={<LeftHeaderLinks />}
          fixed
          key='myHeader'
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/app/" component={GenericApp} />
          <Route path="/arcade" component={Arcade} />
        </Switch>
        <Footer
          leftLinks={<FooterLinks />}
          key='myFooter'
        />
      </Router>
    </div>
  );
}

export default App;