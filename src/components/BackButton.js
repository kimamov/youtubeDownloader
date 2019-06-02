import React from 'react'

const BackButton = ({history,cssStyle,children}) => {
  return (
    <div onClick={history.goBack} className={cssStyle}>
      {children}
    </div>
  )
}

export default BackButton
