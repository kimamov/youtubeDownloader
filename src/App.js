import React, { Component } from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import './Sass/style.css';
import RouteUndef from './components/RouteUndef.js'
import Downloader from './components/Downloader.js'
import Navigation from './components/Navigation.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div></div> */}
        <Navigation></Navigation>
          <main>
            <Switch>
            
              {/* <Route component={RouteUndef}/> */}
            </Switch>
            <Route path='/' component={Downloader}/>

          </main>
      </div>
    );
  }
}

export default App;