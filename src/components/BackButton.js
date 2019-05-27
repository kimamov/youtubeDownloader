import React from 'react'
import { browserHistory } from 'react-router'

const BackButton = ({history,cssStyle,children}) => {
  return (
    <div onClick={history.goBack} className={cssStyle}>
      {children}
    </div>
  )
}

export default BackButton
