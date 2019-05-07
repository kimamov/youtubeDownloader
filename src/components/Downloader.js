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

export default class App extends Component {
  constructor(props) {
    super(props)
    this.dlOptions=["dl","audio"]
    this.dlMode=0;
    this.quickQueryOtions=[
      '',
      '&options=quality:highest',
      '&options=filter:audioonly',
      '&options=quality:lowestaudio'
    ];
    this.selectedOptions=''
    this.modes=['DOWNLOAD A VIDEO! :)','CLIENT SIDE DOWNLOAD','SERVER SIDE DOWNLOAD','LOW DATA MODE']
    
    this.state = {
        videoLink: this.linkFromQuery(this.props.location.search) || '',
        videoInfo: [],
        typeSelect: 0,
        quickType: "0",
        dlSelected: false,
        mode: 0,
        downloadListOpen: false,
        videoName: ''
    }
    this.stateFromQuery()

  }
  onChange=(event)=>{
    const name=event.target.name
    this.setState({[name]:event.target.value})
  }
  onChangeType=(event)=>{
    const name=event.target.name
    this.setState({[name]:event.target.value},
      ()=>{
        if(name==='quickType'){
          this.selectedOptions=this.quickQueryOtions[this.state.quickType]
        }else if(name==='typeSelect'){
          this.selectedOptions=`&options=quality:${this.state.videoInfo.formats[this.state.typeSelect].itag}`
        }
      })
  }
  getVideo=(event)=>{
    event.preventDefault()
    const optionsQuery=this.selectedOptions
    const videoName=`&name=${this.state.videoName}`
    let dlWindow=window.open(`${BASEURL}${this.dlOptions[this.dlMode]}?videolink=${this.state.videoLink}${optionsQuery}${videoName}`)
    setTimeout(()=>{window.close(dlWindow)},8000)
    
  }
  getVideoInfo=(event)=>{
    if(event){
      event.preventDefault()
    }
    axios.get(`${BASEURL}simpleinfo?videolink=${this.state.videoLink}`).then(res=>{
      console.log(res)
      if(res.data.formats){
        this.setState(
          {videoInfo: res.data,
            videoName:res.data.title,
            dlSelected: true,
            quickType: '0',
            typeSelect: 0
          })
      }
      
    }).catch(error=>{
      console.log(error)
    })
  }

  dlVideoClient=(url)=>{
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
  }
  componentDidMount(){
 
  }
  stateFromQuery=()=>{
    const videoQuery=this.props.location.search;
    if(this.linkFromQuery(videoQuery)){
        this.getVideoInfo()
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
  render() {
    return (
      <div className={'downloadContainer'}>
        <div id='dlComponent'>
        <h1>{this.modes[this.state.mode]}</h1>
        <header className="App-header">
          <p>{this.state.videoInfo?this.state.videoInfo.title:''}</p>
          <img alt='' src={this.state.videoInfo.thumbnail}></img>
        </header>
        {!this.state.dlSelected&&<SearchBar search={this.state.videoLink} onChange={this.onChange} getVideoInfo={this.getVideoInfo}></SearchBar>}
        {this.state.dlSelected&&
        <div>
        <NameSelect onChange={this.onChange} videoName={this.state.videoName}></NameSelect>
        <FormatSelect 
          onChange={this.onChangeType}
          //onSubmit={(event,url)=>this.dlVideo(event,"http://localhost:5000/dl?videolink=https://www.youtube.com/watch?v=GSLPOmQV9_w"/* this.state.videoInfo.formats[this.state.typeSelect].url */)}
          onSubmit={this.getVideo}  
          typeSelect={this.state.typeSelect} 
          videoInfo={this.state.videoInfo}
          quickType={this.state.quickType}>
        </FormatSelect>
        </div>}
        {this.state.dlSelected&&
          <Switch>
          <Route exact path='/' render={()=><Link 
            to={`/downloadlist/${this.props.location.search}`}
            className={'downloadListToggle undecoratedLink'}>
            <p>ADVANCED</p>
            </Link>}
          />
          <Route exact path='/downloadlist' render={({history})=><BackButton 
            history={history} 
            cssStyle={'downloadListToggle mobileBack'}>
            <p>ADVANCED</p>
            </BackButton>}
          />
          </Switch>
        }
        </div>
        
        {this.state.dlSelected&&
          <Route path='/downloadlist' 
          render={({history})=><DownloadList history={history} videoName={this.state.videoName} videoSelect={this.state.videoInfo}/>} 
          />        
        }
        <About></About>
      </div>
    )
  }
}
