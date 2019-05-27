import React from 'react'

const NameSelect = ({videoName, onChange}) => {
  return (
    <div className='nameSelect'>
        <p>SUGGESTED FILE NAME</p>
        <input placeholder={"select a filename"} name='videoName' type='text' value={videoName} onChange={onChange}></input>        
    </div>          
  )
}

export default NameSelect