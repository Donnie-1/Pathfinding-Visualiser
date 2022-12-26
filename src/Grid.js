import { useState } from 'react';
import "./Grid.css"; 
import {shortestPath} from './Dijkstra.js'; 

export default function Grid() {
  const [grid, setGrid] = useState(() => {
    return Array(35)
      .fill(null)
      .map(() => Array(20).fill(null));
  });

  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  function updateCell(row, col) {
    let value = ""; 

    if (!startNode) {
      setStartNode([row, col]);
      value = String.fromCharCode(9654);
    } else if (!endNode) {
      setEndNode([row, col]);
      value = String.fromCharCode(9726); 
    }

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = value;
      return newGrid;
    });
  }

  function highlightShortestPath() {
    const path = shortestPath(grid, startNode, endNode);

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      for (const node of path) {
        newGrid[node[0]][node[1]] = 'O';
      }
      return newGrid;
    });
  }

  return (
    <>
    <div className='grid-parent'>
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} >
            {row.map((cell, colIndex) => (
              <div className='grid-item'
                key={colIndex}
                onClick={() => {
                  updateCell(rowIndex, colIndex);
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className='play-button'
      onClick={() => {
        highlightShortestPath();
      }}
      >Play</div>
    </>
  );
}
