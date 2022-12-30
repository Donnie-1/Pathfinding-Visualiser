import React from 'react'
import { useState } from 'react';

import "./Nav.css"
export function Nav(props) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  function handleOptionChange(option) {
    setSelectedAlgorithm(option);
  }

  function reset() { 
    window.location.reload();
  }

  return (
    <>
      <div className='nav-bar'>
      <div className='header'>Path Finder Visualiser</div>
      <ul>
      <Dropdown title="Algorithms" items={['A-Start', 'DFS', 'Submenu 3']} 
      selectedAlgorithm={selectedAlgorithm} onAlgoChange={handleOptionChange} />
      <Dropdown title="Mazes" items={['Submenu 4', 'Submenu 5']} />
        
        <li 
          className='nav-item play-button'
          onClick={props.onClick}
          ><a>Visualise {selectedAlgorithm}</a> 
				</li>
        
        <li className='nav-item'>Wall</li>
        <li 
          className='nav-item'
          onClick={reset}
          ><a >Reset</a>
        </li>
        
    </ul>
    </div>
    <Ledger />
    </>
  )
}

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [className, setclassName] = useState("nav-item nav-link");

  function handleClick() {
    setIsOpen(!isOpen);
    setclassName(isOpen ? "nav-item nav-link" : "nav-active");
  }

  function handleChange(item) {
    props.onAlgoChange(item);
  }

  return (
    <li onClick={handleClick}>
      <a href="#" className={className}>{props.title} 
        <span className='arrow'></span>
      </a>
      {isOpen && (
        <div 
          className="dropdown-content" 
          style={{display: 'flex'}}
          value={props.selectedAlgorithm} 
          onChange={handleChange}
        >
          {props.items.map(item => (
            <a 
              href="#" 
              className="drop-item" 
              onClick={ () => {handleClick(); handleChange(item)}} 
              value={item}>
              {item}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

function Ledger() { 
  return (
    <div className='ledger'>
      <div className='ledger-item'>▶ Start node </div>
      <div className='ledger-item'>◾ End node </div>
      <div className='ledger-item'>
        <div className='ledger-wall'></div>
        Wall</div>
      <div className='ledger-item'>
        <div className='ledger-wall' style={{background: "#C274FD"}}></div>
        Visited</div>
      <div className='ledger-item'>
        <div className='ledger-wall' style={{background: "yellow"}}></div>
        Path</div>
    </div>
  )
}