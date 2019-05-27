import React, { Component } from 'react'
import axios from 'axios'
import {Link, Route, Switch} from 'react-router-dom'
import SearchBar from './SearchBar.js'
import NameSelect from './NameSelect.js'
import DownloadList from './DownloadList'
import BackButton from './BackButton.js'
import About from './About'
import FormatSelect from './FormatSelect.js'
const BASEURL='http://82.165.121.77:5000/'

export default class ComponentName extends Component {
  constructor(props) {
    super(props)
    this.quickQueryOtions=[
      {options:'',mime:'&mime=mp4'},
      {options:'&options=quality:highest',mime:'&mime=mp4'},
      {options:'&options=filter:audioonly',mime:'&mime=mp3'},
      {options:'&options=quality:lowestaudio',mime:'&mime=mp3'}
    ];
    this.selectedOptions=''
    this.selectedMime=''
    this.modes=['DOWNLOAD A VIDEO! :)','CLIENT SIDE DOWNLOAD','SERVER SIDE DOWNLOAD','LOW DATA MODE']
    
    
    this.state = {
        videoLink: this.linkFromQuery(this.props.location.search) || '',
        videoInfo: [],
        typeSelect: 0,
        quickType: "0",
        dlSelected: false,
        mode: 0,
        downloadListOpen: false,
        videoName: '',
        videoURL: ''
    }
    this.stateFromQuery()

  }
  onChange=(event)=>{
    const name=event.target.name
    const videoURLUpdate=this.getVideoURL();
    this.setState({[name]:event.target.value, videoURL: videoURLUpdate})
  }
  onChangeType=(event)=>{
    const name=event.target.name
    if(name==='quickType'){
      const selectedQuery=this.quickQueryOtions[event.target.value]
      this.selectedOptions=selectedQuery.options
      this.selectedMime=selectedQuery.mime
    }else if(name==='typeSelect'){
      const selectedQuery=this.state.videoInfo.formats[event.target.value]
      this.selectedOptions=`&options=quality:${selectedQuery.itag}`
      // get second part of formats.type audio/webm
      const mimeParts=selectedQuery.type.split('/')
      const mimeFromFormats=mimeParts[1]?`&mime=${mimeParts[1]}`:''
      this.selectedMime=mimeFromFormats
    }
    const videoURLUpdate=this.getVideoURL();
    this.setState({[name]:event.target.value,videoURL: videoURLUpdate})
  }
  getVideo=(event)=>{
    event.preventDefault()
    const optionsQuery=this.selectedOptions
    const mimeQuery=this.selectedMime
    let videoNameOriginal=this.state.videoName
    // lovely node is racist and only wants ascii
    videoNameOriginal=videoNameOriginal.replace(/[^\x00-\x7F]/g, "") 
    const videoName=`&name=${videoNameOriginal}`
    //if mime is mp3 call the dlmp3 route to convert video before sending
    const dlMode=mimeQuery==='&mime=mp3'?'dlmp3':'dl';

    let dlWindow=window.open(`${BASEURL}${dlMode}?videolink=${this.state.videoLink}${optionsQuery}${videoName}${mimeQuery}`)
    setTimeout(()=>{window.close(dlWindow)},8000)
    
  }
  getVideoURL=()=>{
    const optionsQuery=this.selectedOptions
    const mimeQuery=this.selectedMime
    let videoNameOriginal=this.state.videoName
    // lovely node is racist and only wants ascii
    videoNameOriginal=videoNameOriginal.replace(/[^\x00-\x7F]/g, "") 
    const videoName=`&name=${videoNameOriginal}`
    //if mime is mp3 call the dlmp3 route to convert video before sending
    const dlMode=mimeQuery==='&mime=mp3'?'dlmp3':'dl';

    const videoURL=`${BASEURL}${dlMode}?videolink=${this.state.videoLink}${optionsQuery}${videoName}${mimeQuery}`
    return videoURL
  }
  getVideoInfo=(event)=>{
    if(event){
      event.preventDefault()
    }
    axios.get(`${BASEURL}simpleinfo?videolink=${this.state.videoLink}`).then(res=>{
      //console.log(res)
      if(res.data.formats){
        this.setState(
          {videoInfo: res.data,
            videoName:res.data.title,
            dlSelected: true,
            quickType: '0',
            typeSelect: 0,
            videoURL: `${BASEURL}dl?videolink=${this.state.videoLink}${res.data.title.replace(/[^\x00-\x7F]/g, "")}`
          },()=>{
            this.props.history.push(`/video?video=${this.state.videoLink}`)
          })
      }
      
      
    }).catch(error=>{
      //console.log(error)
    })
  }


  /* dlVideoClient=(url)=>{
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', 
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.mp4'); 
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    });
  }
  dlVideo=(event,url)=>{
    event.preventDefault()
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob', 
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.mp4'); 
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       URL.revokeObjectURL(url)
    });
  } */

  stateFromQuery=()=>{
    if(this.props.location.pathname==='/video' && this.linkFromQuery(this.props.location.search)){
      this.getVideoInfo()     
    }else{
      this.props.history.push('/')
    }
  }
  linkFromQuery=(query)=>{
    if(query){
      const queryParts=query.split('?video=')
      if(queryParts[0]===''){
        const regEx = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = queryParts[1].match(regEx);
        if ( match && match[7].length === 11 ){
          return queryParts[1]
        }
      }
    
    }
  }
  resetState=()=>{
    this.selectedOptions=''
    this.selectedMime=''
    this.setState({
      videoLink: this.linkFromQuery(this.props.location.search) || '',
      videoInfo: [],
      typeSelect: 0,
      quickType: "0",
      dlSelected: false,
      mode: 0,
      downloadListOpen: false,
      videoName: '',
      videoURL: ''
  })
  }
  render() {
    return (
      <div className={'downloadContainer'}>
        <div id='dlComponent'>
        <h1>{this.modes[this.state.mode]}</h1>
        <header className="App-header">
          <p>{this.state.videoInfo?this.state.videoInfo.title:''}</p>
          <img alt='' src={this.state.videoInfo.thumbnail}></img>
        </header>
        <Route exact path='/'
          render={()=>
            <SearchBar resetState={this.resetState} search={this.state.videoLink} onChange={this.onChange} getVideoInfo={this.getVideoInfo}/>
          }
        />
        {this.state.dlSelected&&<div>
        <NameSelect onChange={this.onChange} videoName={this.state.videoName}></NameSelect>
        <FormatSelect 
          onChange={this.onChangeType}
          //onSubmit={(event,url)=>this.dlVideo(event,"http://localhost:5000/dl?videolink=https://www.youtube.com/watch?v=GSLPOmQV9_w"/* this.state.videoInfo.formats[this.state.typeSelect].url */)}
          onSubmit={this.getVideo}
          videoURL={this.state.videoURL}  
          typeSelect={this.state.typeSelect} 
          videoInfo={this.state.videoInfo}
          quickType={this.state.quickType}>
        </FormatSelect>
        </div>}
        
        {this.state.dlSelected&&
        <Switch>
          <Route exact path='/video/' render={()=><Link 
            to={`/video/downloadlist${this.props.location.search}`}
            className={'downloadListToggle undecoratedLink centerAll mobileAdvanced'}>
            <p>ADVANCED</p>
            </Link>}
          />
          <Route exact path='/video/downloadlist'  render={({history})=><BackButton 
            history={history} 
            cssStyle={'downloadListToggle mobileBack spinLoad centerAll'}>
            <i class="material-icons">
              close
            </i>
          </BackButton>}
          />
          </Switch>
        }
        </div>
        {this.state.dlSelected&&<Route exact path='/video/downloadlist' 
          render={({history})=><DownloadList history={history} videoName={this.state.videoName} videoSelect={this.state.videoInfo}/>} 
        />}        
      </div>
    )
  }
}
