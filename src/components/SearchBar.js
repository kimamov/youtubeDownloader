import React from 'react'

const SearchBar = (props) => {
  return (
    <form id='videoSearchForm' onSubmit={props.getVideoInfo}>
        <div>
            <input value={props.search} placeholder='youtube video url' name='videoLink' type='text' onChange={props.onChange}></input>
            <input className='roundedButton' type="submit"></input>
        </div>       
    </form>
  )
}

export default SearchBar

