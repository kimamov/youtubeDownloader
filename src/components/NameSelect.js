import React from 'react'

const NameSelect = (props) => {
  return (
    <div className='nameSelect'>
        <p>SUGGESTED FILE NAME</p>
        <input placeholder={"select a filename"} name='videoName' type='text' value={props.videoName} onChange={props.onChange}></input>        
    </div>          
  )
}

export default NameSelect