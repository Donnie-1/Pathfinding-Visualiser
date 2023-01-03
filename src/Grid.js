import { useState } from 'react';
import "./Grid.css"; 
import {shortestPath} from './Dijkstra.js'; 
import {Nav} from './Nav.js'; 
import {DFS} from './DFS.js';
import {bidirectionalShortestPath} from './bidirectionalBFS.js';


function Cell (props, {value}) {

  if (props.row === props.startNode[0] && props.col === props.startNode[1]) {
    value =  String.fromCharCode(9654)
  }
  if (props.row === props.endNode[0] && props.col === props.endNode[1]) {
    value = String.fromCharCode(9726);
  }

  return (
    <div
      style={props.style}
      className={props.className}                                      // isWall, isVisited, isPath
      onMouseOver={() => { props.updateNode(props.row, props.col, "wall", [true, false, false]) }}
      onMouseDown={() => { props.onMouseDown() }}
      onMouseUp={() => { props.onMouseUp() }}
    >
      {value}
    </div>
  );
};

function Grid() {
  const rowSize = 50; 
  const colSize = 50;
  const startNode = [10, 25];
  const endNode = [40, 25];

  const [grid, setGrid] = useState(() => {
    return Array(colSize)
      .fill(null)
      .map(() => Array(rowSize).fill({ 
        value: '', 
        style: {}, 
        className: 'cell', 
        isWall: false, 
        isVisited: false, 
        isPath: false,
      }));
  });

  function updateNode(row, col, className, nodeType) {
    if  (row === startNode[0] && col === startNode[1] || 
        row === endNode[0] && col === endNode[1]) {
      return; 
    }
 

    if  (isHolding || nodeType[1]) {  
      setGrid(() => {
        const newGrid = grid.slice();
        newGrid[row][col] = {
          className: `${className}`,
          isWall: nodeType[0],
          isVisited: nodeType[1], 
          isPath: nodeType[2], 
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

  const array = [[0,0]]; 
  function highlightVisited(visitedNodes) { 

    for (let i = 0; i < visitedNodes.length; i++) {
      const [row, col] = visitedNodes[i];
      if (grid[row][col].isWall) {
        continue;
      }
      if (row === endNode[0] && col === endNode[1]) { 
        break; 
      }

      array.push([row, col]);
      setTimeout(() => {
        
        updateNode(row, col, "visitedPath visitedNodePurple", [false, true, false]);
      }, 5*i);
    
    }
    return; 
  }
  
  function highlightPath(path) { 
    for (let i = 0; i < path.length; i++) {
      const [row, col] = path[i];
  
      setTimeout(() => {
          updateNode(row, col, "path", [false, true, true]);
          
      }, 20 * i);
    
    }
    return; 
  }
  
  function highlightShortestPath() {
    
    //const [path, b] =  shortestPath(grid, startNode, endNode, colSize, rowSize)
    const [visitedNodes, path] = bidirectionalShortestPath(grid, startNode, endNode, colSize, rowSize); 

    if (path === null){
      alert("No path found");
      return;
    }
    highlightVisited(visitedNodes, path);
    setTimeout(() => {
      highlightPath(path);
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
                startNode={startNode}
                endNode={endNode}
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

