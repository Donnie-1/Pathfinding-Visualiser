import React from 'react'
import "./Nav.css"
export function Nav(props) {

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
    </div>
  )
}
