import React from 'react'
import { browserHistory } from 'react-router'

const BackButton = (props) => {
  return (
    <div onClick={props.history.goBack} className={props.cssStyle}>
      {props.children}
    </div>
  )
}

export default BackButton
