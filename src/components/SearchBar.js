
import React, { Component } from 'react'
import PropTypes from 'prop-types';

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

  
SearchBar.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
  getVideoInfo: PropTypes.func
}


