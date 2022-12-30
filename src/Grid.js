import { useState } from 'react';
import "./Grid.css"; 
import {shortestPath} from './Dijkstra.js'; 
import {Nav} from './Nav.js'; 



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
      onMouseOver={() => { updateNode(row, col, "wall", false) }}
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

  function updateNode(row, col, className, pathCondition) {
    if (isHolding || pathCondition) {  
      setGrid(() => {
        const newGrid = grid.slice();
        newGrid[row][col] = {
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


  function highlight1(visitedNodes) { 
    for (let i = 0; i < visitedNodes.length; i++) {
      const [row, col] = visitedNodes[i];
      if (grid[row][col].isWall) {
        continue;
      }
      if (row === 42 && col === 15) { 
        break; 
      }
      setTimeout(() => {
        if (row !== 7 || col !== 15) {
        updateNode(row, col, "visitedPath visitedNodePurple", true);
        }
      }, 5 * i);
    
    }
    return; 
  }
  
  function highlight2(path) { 
   
    for (let i = 0; i < path.length; i++) {
      const [row, col] = path[i];
  
      setTimeout(() => {
        updateNode(row, col, "path", true);
      }, 20 * i);
    
    }
    return; 
  }
  
  function highlightShortestPath() {
    const [path, visitedNodes] = shortestPath(grid, [7, 15], [42, 15]);
    if (path === null){
      alert("No path found");
      return;
    }
    highlight1(visitedNodes);
    setTimeout(() => {
      highlight2(path);
    }, visitedNodes.length * 5);
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

