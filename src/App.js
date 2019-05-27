import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './Sass/style.css';
import RouteUndef from './components/RouteUndef.js'
import Downloader from './components/Downloader.js'
import About from './components/About.js'
import MobileAbout from './components/MobileAbout.js'
import Navigation from './components/Navigation.js'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


const BASEURL='http://82.165.121.77:5000/'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        
    }

  }


  
  render() {
    return (
      <div style={{height: window.innerHeight}} className={'App'}>
        <Route path='' component={Navigation}/>
          <main>
            {/* <Switch>
              <Route path='/video' component={Downloader}/>
              <Route path='/' component={Downloader}/>
              {<Route path='/about' component={MobileAbout}/>}
            </Switch> */}
            <Route component={Downloader}/>
            <Route path='/about' component={MobileAbout}/>
            <About/>
          </main>
      </div>
    );
  }
}

export default withRouter(App);