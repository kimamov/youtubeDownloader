import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'

export default class componentName extends Component {
    constructor(props) {
      super(props)
      this.state = {
         mobileNav: false
      }
    }
  componentDidMount(){
    console.log(window.location.pathname)
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
      <Link to={'./nav'}><div 
        className={`mobileNavToggle`}>
      </div></Link>
      <Route path='/nav' render={()=><nav className={'mobileNav'}>
        <Link to={'..'}><div 
        className={`mobileNavToggle`}>
        </div></Link>
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
      </nav>}/>
      </div>
    )
  }
}
