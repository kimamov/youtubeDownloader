import React from 'react'
import PropTypes from 'prop-types';


const NameSelect = ({videoName, onChange}) => {
  return (
    <div className='nameSelect'>
        <p>SUGGESTED FILE NAME</p>
        <input placeholder={"select a filename"} name='videoName' type='text' value={videoName} onChange={onChange}></input>        
    </div>          
  )
}
NameSelect.propTypes = {
  videoName: PropTypes.string,
  onChange: PropTypes.func,

}

export default NameSelect