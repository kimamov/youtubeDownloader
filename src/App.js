import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.dlOptions=["download","audio"]
    this.dlMode=0;
    this.state = {
        videoLink: '',
        videoInfo: []
    }
  }
  onChange=(event)=>{
    event.preventDefault()
    const name=event.target.name
    this.setState({[name]:event.target.value})
  }
  getVideo=(event)=>{
    event.preventDefault()
    let dlWindow=window.open(`http://localhost:5000/${this.dlOptions[this.dlMode]}?videolink=${this.state.videoLink}`)
    setTimeout(()=>{window.close(dlWindow)},8000)
    
  }
  getVideoInfo=(event)=>{
    event.preventDefault()
    axios.get(`http://localhost:5000/info?videolink=${this.state.videoLink}`).then(res=>{
      console.log(res)
      this.setState({videoInfo: res.data})
    }).catch(error=>{
      console.log(error)
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.videoLink}
        </header>
        <form id='videoSearchForm' onSubmit={this.getVideoInfo}>
          <input name='videoLink' type='text' onChange={this.onChange}></input>
          <input type="submit"></input>
        </form>
        <div>
          {this.state.videoInfo.map(item=>
            <p>{'type: '+JSON.stringify(item.type) +'quality: '+ JSON.stringify(item.quality)}</p>
          )}
        </div>
      </div>
    )
  }
}
