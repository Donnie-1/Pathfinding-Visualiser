import React from 'react'
import { useState } from 'react';

import "./Nav.css"
export function Nav(props) {

  function reset() { 
    window.location.reload();
  }

  return (
      <div className='nav-bar'>
      <div className='header'>Path Finder</div>
      <ul>
      <Dropdown title="Algorithms" items={['Submenu 1', 'Submenu 2', 'Submenu 3']} />
      <Dropdown title="Mazes" items={['Submenu 4', 'Submenu 5']} />
        
        <li 
          className='nav-item play-button'
          onClick={props.onClick}
          ><a >Visualise</a> 
				</li>
        
        <li className='nav-item'>Wall</li>
        <li 
          className='nav-item'
          onClick={reset}
          ><a >Reset</a>
        </li>
    </ul>
    </div>

  )
}

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <li onClick={handleClick}>
      <a href="#" className=" nav-item nav-link">{props.title} <span className='arrow'></span></a>
      {isOpen && (
        <div className="dropdown-content" style={{display: 'flex'}}>
          {props.items.map(item => (
            <a href="#" className="drop-item" onClick={handleClick} key={item}>{item}</a>
          ))}
        </div>
      )}
    </li>
  );
}

function ManageDropdown() { 

}