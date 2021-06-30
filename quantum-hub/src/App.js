// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header/Header.js'
import RightHeaderLinks from './components/Header/RightHeaderLinks.js'
import LeftHeaderLinks from './components/Header/LeftHeaderLinks.js'

import Footer from './components/Footer/Footer.js'
import FooterLinks from './components/Footer/FooterLinks.js'

import Home from "./views/Home";
import App from "./views/App";

function Hub() {
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
          <Route path="/" exact component={() => <Home />} />
          <Route path="/app/" component={() => <App />} />
        </Switch>
        <Footer
          leftLinks={<FooterLinks />}
          key='myFooter'
        />
      </Router>
    </div>
  );
}

export default Hub;