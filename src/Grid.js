import { useState } from 'react';
import "./Grid.css"; 
import {shortestPath} from './Dijkstra.js'; 
import {Nav} from './Nav.js'; 

const grid = Array(50)
            .fill()
            .map(() => Array(30).fill({ value: ' ', weight: 1 }));

export default function Grid() {
  const [isHolding, setIsHolding] = useState(false);

  function handleMouseDown() {
    setIsHolding(true);
  }

  function handleMouseUp() {
    setIsHolding(false);
  }

  // grid[7][15] = String.fromCharCode(9654);
  // grid[43][15] = String.fromCharCode(9726);
  let startNode = [7, 15];
  let endNode = [43, 15];

  function updateCell(row, col) {
    if (isHolding) { 
      grid[row][col] = 'X';
    }
  }

  function highlightShortestPath() {
    
    const path = shortestPath(grid, startNode, endNode);
    console.log(path, "Path"); 
   
    for (const node of path) {
     
      grid[node[0]][node[1]] = 'O';
    }
 }

  return (
    <>
    <Nav onClick={highlightShortestPath} />
      <div className='grid-parent'>
        <div className='grid'>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} >
              {row.map((cell, colIndex) => (
                <div 
                  key={colIndex}
                  className={cell === 'X' ? 'cell-wall' : 'cell'}
                  style={{ backgroundColor: cell === 'X' ? 'black' : 'white' }}
                  
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}

                  onMouseOver={() => {
                    updateCell(rowIndex, colIndex);
                  }}
                  
                >
                {cell}
                {isHolding ? true : false}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
