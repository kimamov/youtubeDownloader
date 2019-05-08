
import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  componentDidMount(){
    this.props.resetState()
  }
  render() {
    return (
      <form id='videoSearchForm' onSubmit={this.props.getVideoInfo}>
        <div>
            <input value={this.props.search} placeholder='youtube video url' name='videoLink' type='text' onChange={this.props.onChange}></input>
            <input className='roundedButton' type="submit"></input>
        </div>       
      </form>
    )
  }
}



