// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation, withRouter } from "react-router-dom";

import Header from './components/Header/Header.js';
import RightHeaderLinks from './components/Header/RightHeaderLinks.js';
import LeftHeaderLinks from './components/Header/LeftHeaderLinks.js';

import Footer from './components/Footer/Footer.js';
import RightFooterLinks from './components/Footer/RightFooterLinks.js';
import PartnerLinks from './components/Footer/PartnerLinks.js';

import Home from "./views/Home";
import Game from "./views/Game";
import Arcade from "./views/Arcade";

function _ScrollToTop(props) {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return props.children
}

const ScrollToTop = withRouter(_ScrollToTop)

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
        <ScrollToTop>
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
            partnerLinks={<PartnerLinks />}
            rightLinks={<RightFooterLinks />}
            key='myFooter'
          />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;