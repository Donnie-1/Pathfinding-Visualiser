import React from 'react'
import { useState } from 'react';


import "./Nav.css"
export function Nav(props) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [selectedMaze, setSelectedMaze] = useState('');

  function handleOptionChange(option) {
    setSelectedAlgorithm(option);
  }

  function reset() { 
    window.location.reload();
  }

  function HandleClick(event) { 
    let li = event.target;
    if (li.tagName !== 'LI') {
      // If the clicked element is not an li, find the closest li ancestor
      li = li.closest('li');
    }
    if (li.dataset.button === '1') {
      props.onClick("maze"); 
    } else if (li.dataset.button === '2') {
      props.onClick(selectedAlgorithm)
    } else if (li.dataset.button === '3') {
      props.onClick("ClearWalls"); 
    }else if (li.dataset.button === '4') {
      props.onClick("ClearPath"); 
    }
  }

  return (
    <div className="outer-nav">
      <div className='nav-bar'>
      <div className='header'>Path Finder Visualiser</div>
      <ul>

      <Dropdown className='nav-item' title="Algorithms" items={["Dijkstra", 'DFS', 'Bi-Directional BFS']} 
      selectedAlgorithm={selectedAlgorithm} onAlgoChange={handleOptionChange} />
      
      <li 
        className='nav-item gen'
        data-button="1"
        onClick={HandleClick}>
          Generate Random Maze
      </li>
        
        <li 
          className='nav-item play-button'
          data-button="2"
          onClick={HandleClick}>
            Visualise {selectedAlgorithm}
				</li>
        

        <li 
          className='nav-item'
          onClick={reset}>
          Reset
        </li>

        <li 
        className='nav-item'
        data-button="3"
        onClick={HandleClick}> 
        Clear Walls
      </li>

      <li 
        className='nav-item'
        data-button="4"
        onClick={HandleClick}
        >Clear Path
      </li>
        
    </ul>
    </div>
    <Ledger />
    </div>
  )
}

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [className, setclassName] = useState("nav-item nav-link");

  function handleClick(item) {

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
              onClick={ () => {handleClick(item); handleChange(item)}} 
              value={item}
              key={item}>
                
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