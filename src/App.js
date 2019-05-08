import React, { Component } from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import './Sass/style.css';
import RouteUndef from './components/RouteUndef.js'
import Downloader from './components/Downloader.js'
import WelcomeBanner from './components/WelcomeBanner.js'
import Navigation from './components/Navigation.js'


class App extends Component {
  render() {
    return (
      <div style={{height: window.innerHeight}} className={'App'}>
        {/* <div></div> */}
        <Route path='' component={Navigation}/>
          <main>
            <Switch>
              {/* <Route component={RouteUndef}/> */}
            </Switch>
            <section className={'mainSection'}>
            {/* <WelcomeBanner></WelcomeBanner> */}
            <Route path='/' component={Downloader}/>
            </section>
          </main>
      </div>
    );
  }
}

export default App;