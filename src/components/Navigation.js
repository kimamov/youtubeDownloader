import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import BackButton from './BackButton.js'


export default class componentName extends Component {
    constructor(props) {
      super(props)
      this.state = {
         mobileNav: false
      }
    }

  render() {
    return (
      <div className='navComp'>
      <Link to={`/video/nav/${this.props.location.search}`}>
        <div className={`mobileNavToggle undecoratedLink`}>
          <i className="material-icons">
            menu
          </i>
        </div>
      </Link>
      <Route path='/video/nav' render={({history})=><nav className={'mobileNav'}>
        <BackButton
            history={history} 
            cssStyle={'mobileNavToggle spinLoad'}>
            <i className="material-icons">
            close
            </i>
        </BackButton>
        <div id='mobileNavOuter'>
        <div id='mobileNavInner' className={`mobileNavToggle ${this.state.mobileNav?'mobileNavToggleOpen':''}`}>
          {<div id='innerContainer'>         
          <ul>
            <Link className={'somePadding undecoratedLink'} to='/'>HOME</Link>
            <Link className={'somePadding undecoratedLink'} to='/about'>INFO</Link>
          </ul>
          </div>}
        </div>
        </div>
      </nav>}/>
      </div>
    )
  }
}
