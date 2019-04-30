import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        videoLink: ''
    }
  }
  onChange=(event)=>{
    event.preventDefault()
    const name=event.target.name
    this.setState({[name]:event.target.value})
  }
  getVideo=(event)=>{
    event.preventDefault()
    let dlWindow=window.open(`http://localhost:5000/audio?videolink=${this.state.videoLink}`)
    setTimeout(()=>{window.close(dlWindow)},8000)
    
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.videoLink}
        </header>
        <form onSubmit={this.getVideo}>
          <input name='videoLink' type='text' onChange={this.onChange}></input>
          <input type="submit"></input>
      </form>
    </div>
    )
  }
}
