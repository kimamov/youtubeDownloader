import React from 'react'
import BackButton from './BackButton.js'
import PropTypes from 'prop-types';


const DownloadList = ({history, videoName, videoSelect}) => {
  return (
    <div className={'downloadList slideInFromTop'}>
        <div className={'downloadListHeader'}>
            <BackButton
            history={history} 
            cssStyle={'downloadListClose'}>
            <i className="material-icons">
              close
            </i>
            </BackButton>
            <h1>LIST OF FORMATS</h1>
            <p>SAVE AS FROM HERE</p>
        </div>
        <div className={'listContainer'}>
            {(typeof videoSelect.formats =="object")&&videoSelect.formats.map((item,index)=>
            <div value={index} key={`dlist${index}`}>
                <p>{'type: '+item.type}</p>
                <p>{' quality: '+ item.quality+ ' '+(item.videoOnly?'only video':'')}</p>
                <a href={item.url} Download={`${videoName}.mp4`}>VIDEO</a>
            </div>
            )}
        </div>    
    </div>
  )
}

DownloadList.propTypes = {
  videoName: PropTypes.string,
  videoSelect: PropTypes.array
}

export default DownloadList
