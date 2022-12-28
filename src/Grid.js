import { useState } from 'react';
import "./Grid.css"; 
import {shortestPath} from './Dijkstra.js'; 
import {Nav} from './Nav.js'; 
import {trace} from './Dijkstra.js'; 


const Cell = ({ row, col, value, style, className, updateNode, onMouseDown, onMouseUp}) => {
  if (row === 7 && col === 15) {
    value = String.fromCharCode(9654)
  }
  if (row === 42 && col === 15) {
    value = String.fromCharCode(9726)
  }

  return (
    <div
      style={style}
      className={className}
      onMouseOver={() => { updateNode(row, col, "black", "wall", false) }}
      onMouseDown={() => { onMouseDown() }}
      onMouseUp={() => { onMouseUp() }}
    >
      {value}
    </div>
  );
};

function Grid() {
  const [grid, setGrid] = useState(() => {
    return Array(50)
      .fill(null)
      .map(() => Array(30).fill({ value: '', style: {}, className: 'cell', isWall: false }));
  });

  function updateNode(row, col, color, className, pathCondition) {
    if (isHolding || pathCondition) {  
      setGrid(() => {
        const newGrid = grid.slice();
        newGrid[row][col] = {
          style: { backgroundColor: `${color}` },
          className: `${className}`,
          isWall: true, 
        };
        return newGrid;
      });
    }
  };

  // Click and hold event for wall placement
  const [isHolding, setIsHolding] = useState(false);
  function handleMouseDown() {
    setIsHolding(true);
  }

  function handleMouseUp() {
    setIsHolding(false);
  }

  function highlightShortestPath() {
    const path = shortestPath(grid, [7, 15], [42, 15]);

    let i = 0;
    const interval = setInterval(() => {
      if (i === path.length) {
        clearInterval(interval);
        return;
      }
      const node = path[i];
      console.log(node)
      updateNode(node[0], node[1], "yellow", "path", true);
      i++;
    }, 100);
  }

  return (
    <>
    <Nav onClick={highlightShortestPath} />
    <div className ='grid-parent'>
      <div className = 'grid'>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell

                key={colIndex}
                row={rowIndex}
                col={colIndex}
                value={cell.value}
                style={cell.style}
                className={cell.className}
                updateNode={updateNode}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}

              />
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Grid;

