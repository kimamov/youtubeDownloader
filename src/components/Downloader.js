import React, { Component } from 'react'
import axios from 'axios'
import {Link, Route, Switch} from 'react-router-dom'
import SearchBar from './SearchBar.js'
import NameSelect from './NameSelect.js'
import DownloadList from './DownloadList'
import BackButton from './BackButton.js'
import FormatSelect from './FormatSelect.js'
import Logo from './logo1.svg';
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
    this.modes=['YOUTUBE COON','CLIENT SIDE DOWNLOAD','SERVER SIDE DOWNLOAD','LOW DATA MODE']
    
    
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
    if(this.state.videoLink.length>1){
      axios.get(`${BASEURL}simpleinfo?videolink=${this.state.videoLink}`).then(res=>{
        //console.log(res)
        if(res.data.formats){
          console.log(res.data)
          this.setState(
            {videoInfo: res.data,
              videoName:res.data.title,
              dlSelected: true,
              quickType: '0',
              typeSelect: 0,
              videoURL: `${BASEURL}dl?videolink=${this.state.videoLink}`
            },()=>{
              console.log(`/video?video=${this.state.videoLink}`)
              this.props.history.push(`/video?video=${this.state.videoLink}`)
            })
        } 
      }).catch(error=>{
        //console.log(error)
      })
    }
    
  }

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
    if((!this.state.videoInfo || !this.state.videoInfo.length) || this.props.history.location.pathname==='/'){
      return (
        <div className={'downloadContainer'}>
          <div id='dlComponent' className={"startScreenMobile"}>
          
          <img key='mainLogo' className={'logo'} alt='raccoon' src={Logo}></img>
          <h1 key='mainHeader'>{this.modes[this.state.mode]}</h1>
          
              <SearchBar resetState={this.resetState} search={this.state.videoLink} onChange={this.onChange} getVideoInfo={this.getVideoInfo}/>
  
          </div>
             
        </div>
      )
    }
    
    return (
      <div className={'downloadContainer'}>
        <div id='dlComponent'>
        
        <header className="App-header">
          <h1>{this.state.videoInfo?this.state.videoInfo.title:''}</h1>
          <img alt='' src={this.state.videoInfo.thumbnail}></img>
        </header>
     
        <div>
          <NameSelect 
            onChange={this.onChange} 
            videoName={this.state.videoName}>
          </NameSelect>

          <FormatSelect 
            onChange={this.onChangeType}
            onSubmit={this.getVideo}
            videoURL={this.state.videoURL}  
            typeSelect={this.state.typeSelect} 
            videoInfo={this.state.videoInfo}
            quickType={this.state.quickType}>
          </FormatSelect>
        </div>
        
        
        <Switch>
          <Route exact path='/video/' render={()=>
            <Link 
              to={`/video/downloadlist${this.props.location.search}`}
              className={'downloadListToggle undecoratedLink centerAll mobileAdvanced'}>
              <p>
                ADVANCED
              </p>
            </Link>}
          />
          <Route exact path='/video/downloadlist'  render={({history})=><BackButton 
            history={history} 
            cssStyle={'downloadListToggle mobileBack spinLoad centerAll'}>
            <i className="material-icons">
              close
            </i>
          </BackButton>}
          />
          </Switch>
        
        </div>
        <Route exact path='/video/downloadlist' 
          render={({history})=><DownloadList history={history} videoName={this.state.videoName} videoSelect={this.state.videoInfo}/>} 
        />       
      </div>
    )
  }
}
