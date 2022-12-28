import React from 'react'
import "./Nav.css"
export function Nav(props) {

  function reset() { 
    window.location.reload();
  }

  return (
    <div className='nav-bar'>
        <div 
          className='nav-item play-button'
          onClick={props.onClick}
          >Go
				</div>
        <div className='nav-item'>Start Node</div>
        <div className='nav-item'>End Node</div>
        <div className='nav-item'>Wall</div>
        <div 
          className='nav-item'
          onClick={reset}
          >Reset</div>
    </div>
  )
}
