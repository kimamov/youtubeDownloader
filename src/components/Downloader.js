import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.dlOptions=["dl","audio"]
    this.dlMode=1;
    this.modes=['CLIENT SIDE DOWNLOAD','SERVER SIDE DOWNLOAD','LOW DATA MODE']
    this.state = {
        videoLink: '',
        videoInfo: [],
        typeSelect: 0,
        dlSelected: false,
        mode: 0
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
    axios.get(`http://localhost:5000/simpleinfo?videolink=${this.state.videoLink}`).then(res=>{
      console.log(res)
      if(res.data.formats){
        this.setState({videoInfo: res.data,dlSelected: true})
      }
      
    }).catch(error=>{
      console.log(error)
    })
  }

  dlVideoClient=(url)=>{
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       console.log('succes')
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.mp4'); 
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    });
  }
  dlVideo=(url)=>{
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       console.log('succes')
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.mp4'); 
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       URL.revokeObjectURL(url)
    });
  }
  componentDidMount(){
    /* this.dlVideo(
      'https://r3---sn-8xgn5uxa-cxge.googlevideo.com/videoplayback?id=o-AKNbby6tD8YKTUiQYAc_6vcEc3qcOSWIOsegXr0iLgJV&aitags=133,134,135,136,160,242,243,244,247,278,298,302,394,395,396,397&itag=394&source=youtube&requiressl=yes&mm=31,29&mn=sn-8xgn5uxa-cxge,sn-4g5e6nld&ms=au,rdu&mv=m&pcm2cms=yes&pl=24&ei=7UrLXPaHPNHVgQery4PYBA&initcwndbps=1396250&mime=video/mp4&gir=yes&clen=5470553&dur=638.533&lmt=1556822908874006&mt=1556826777&fvip=3&keepalive=yes&c=WEB&txp=5531432&ip=88.130.48.98&ipbits=0&expire=1556848462&sparams=ip,ipbits,expire,id,aitags,source,requiressl,mm,mn,ms,mv,pcm2cms,pl,ei,initcwndbps,mime,gir,clen,dur,lmt&signature=C647A6E17406246772D2966AA253766F2B07BB69.9586DA6C4FC28D0AF095AE556A1E042A00063CE5&key=yt8&ratebypass=yes%27'
      ) */
  }
  render() {
    return (
        <div id='dlComponent'>
        <h>{this.modes[this.state.mode]}</h>
        <header className="App-header">
          <p>{this.state.videoInfo?this.state.videoInfo.title:''}</p>
          <img alt='' src={this.state.videoInfo.thumbnail}></img>
        </header>
        <form id='videoSearchForm' onSubmit={this.getVideoInfo}>
          <input placeholder='youtube video url' name='videoLink' type='text' onChange={this.onChange}></input>
          <input className='roundedButton' type="submit"></input>
          
          <div>SELECT A FORMAT</div>
          <select name='typeSelect' onChange={this.onChange} value={this.state.typeSelect}>
          {(typeof this.state.videoInfo.formats =="object")&&this.state.videoInfo.formats.map((item,index)=>
            <option value={index}>{'type: '+item.type +' quality: '+ item.quality+ ' '+(item.videoOnly?'only video':'')}</option>
          )}
          </select>
        </form>
        {this.state.dlSelected&&
          <button
          onClick={(url)=>this.dlVideo("http://localhost:5000/dl?videolink=https://www.youtube.com/watch?v=poyvTvN1E38"/* this.state.videoInfo.formats[this.state.typeSelect].url */)} 
          className='roundedButton'
          id='clientDownloadButton'>
            DOWNLOAD
          </button>
        }
        </div>
      
    )
  }
}
