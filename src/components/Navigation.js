import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class componentName extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    return (
      <nav className={'topNav'}>
        <ul className={'navList'}>
            <Link className={'somePadding undecoratedLink'} to='/'>ME </Link>
            <Link className={'somePadding undecoratedLink'} to='/'>GAMES</Link>
            <Link className={'somePadding undecoratedLink'} to='/'>INFO</Link>
        </ul>
      </nav>
    )
  }
}
