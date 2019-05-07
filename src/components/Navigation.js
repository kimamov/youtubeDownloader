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
      <Route path='/nav' render={({history})=><nav className={'mobileNav'}>
        <BackButton
            history={history} 
            cssStyle={'mobileNavToggle'}>
            <p>CLOSE</p>
        </BackButton>
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
