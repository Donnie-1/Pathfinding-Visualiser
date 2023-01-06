import { useState  } from 'react';
import "./Grid.css"; 
import {shortestPath} from './Dijkstra.js'; 
import {Nav} from './Nav.js'; 
import {DFS} from './DFS.js';
import {bidirectionalShortestPath} from './bidirectionalBFS.js';
import {generateMaze} from './Maze.js';


function Cell (props) {
  let value = false;
  let className = "cell";
  // Set start
  if (props.row === props.startNode[0] && props.col === props.startNode[1]) {
    value =  true;
    className = "startNode"
  }

  // Set end
  if (props.row === props.endNode[0] && props.col === props.endNode[1]) {
    value =  true; 
    className = "endNode"
  }

  return (
  
  <div
      style={props.style}
      className={value ? className : props.className}                                      // isWall, isVisited, isPath
      onMouseOver={() => { props.updateNode(props.row, props.col, "wall", [true, false, false]) }}
      onMouseDown={props.onMouseDown}
      onMouseUp={ props.onMouseUp}
    >
      {value}
    </div>
  );
};

function Grid() {
  const rowSize = 60; 
  const colSize = 60;
  const startNode = [10, 30];
  const endNode = [50, 30];

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

  const [pathActive, setPathActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function updateNode(row, col, className, nodeType) {
    if  (row === startNode[0] && col === startNode[1] || 
        row === endNode[0] && col === endNode[1]) {
      return; 
    }
    let mazeFlag = false; 
    if (className === "maze wall" || className === "maze") {
      mazeFlag = true;
    }

    if (isHolding || nodeType[1] || mazeFlag) {  
      setGrid(() => {
        const newGrid = grid.slice();
        newGrid[row][col] = {
          className: `${className}`,
          isWall: mazeFlag,
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

  // Highlight algorithm process 
  function highlightVisited(visitedNodes) { 
    for (let i = 0; i < visitedNodes.length; i++) {
      const [row, col] = visitedNodes[i];

      setTimeout(() => {
        updateNode(row, col, "visitedPath visitedNodePurple", [false, true, false]);
      }, 5*i);
    }
  }

  // Highlight (shortest) path
  function highlightPath(path) { 
    for (let i = 0; i < path.length; i++) {
      const [row, col] = path[i];
  
      setTimeout(() => {
        updateNode(row, col, "path", [false, true, true]);
          
      }, 20 * i);
    }
  }

  function highlightWall(walls) {
    if (isAnimating) {
      return
    }

    resetWalls(false);
    setIsAnimating(true);
    
    for (let i = 0; i < walls.length; i++) {
      const [row, col] = walls[i];
      if (row >= rowSize || col >= colSize) {
        continue;
      }

      setTimeout(() => {
        updateNode(row, col, "maze wall", [true, false, false]);
      }, 2*i);

      setTimeout(() => {
        setIsAnimating(false);
      }, walls.length * 2);

    }
  }

  function resetWalls(clearPath) { 
    for (let i = 0; i < rowSize; i++) {
      for (let j = 0; j < colSize; j++) {
        if (clearPath) { 
          if (grid[i][j].isPath || grid[i][j].isVisited) {  
            updateNode(i, j, "cell", [false, true, false]);
          }
        } else if (grid[i][j].isWall && clearPath === false) {
          updateNode(i, j, "cell", [false, true, false]);
        }
      }
    }
  }
  
  function selectPath(algorithm) {
    let visitedNodes = []; 
    let path = []; 
    if (algorithm === "Dijkstra") {
      [path, visitedNodes] = shortestPath(grid, startNode, endNode, colSize, rowSize);
    } else if (algorithm === "DFS") {
      [path, visitedNodes] = DFS(grid, startNode, endNode, colSize, rowSize);
    } else if (algorithm === "Bi-Directional BFS") {
      [path, visitedNodes] = bidirectionalShortestPath(grid, startNode, endNode, colSize, rowSize); 
    }

    if (path === null){
      alert("No path found");
      return;
    }

    highlightVisited(visitedNodes);
    setTimeout(() => {
      highlightPath(path);
    }, (visitedNodes.length) * 5);
  }

  function handleClick(event) {
    if (event.length === 0) { 
      alert("Select an Algorithm! ");
    } else if (event === "maze") {  
      let visitedNodes = generateMaze(rowSize, colSize);
      highlightWall(visitedNodes);
    } else if (event === "ClearWalls") {
      resetWalls(false);
    } else if (event === "ClearPath") {
      resetWalls(true);
    } else { 
      selectPath(event); 
    }
  }

  return (
    <>
    <Nav onClick={handleClick} />
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