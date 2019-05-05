import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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
      <nav className={'topNav'}>
        <ul className={'navList'}>
            <Link className={'somePadding undecoratedLink'} to='/'>ME </Link>
            <Link className={'somePadding undecoratedLink'} to='/'>GAMES</Link>
            <Link className={'somePadding undecoratedLink'} to='/'>INFO</Link>
        </ul>
      </nav>
      <div 
        onClick={()=>this.setState({mobileNav: !this.state.mobileNav})} 
        className={`mobileNavToggle`}>
      </div>
      {this.state.mobileNav&&<nav className={'mobileNav'}>
        <div id='mobileNavOuter'>
        <div id='mobileNavInner' className={`mobileNavToggle ${this.state.mobileNav?'mobileNavToggleOpen':''}`}>
          <div id='innerContainer'>
          <ul>
            <Link className={'somePadding undecoratedLink'} to='/'>OPTIONS</Link>
            <Link className={'somePadding undecoratedLink'} to='/'>HOW TO USE</Link>
            <Link className={'somePadding undecoratedLink'} to='/'>SCHEKEL</Link>
          </ul>
          </div>
        </div>
        </div>
      </nav>}
      </div>
    )
  }
}
