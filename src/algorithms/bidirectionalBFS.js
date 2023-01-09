import {shortestPath} from './Dijkstra.js'; 

export function bidirectionalShortestPath(grid, startNode, endNode, colSize, rowSize, mazeActive) {
    const arr = shortestPath(grid, startNode, endNode, colSize, rowSize);
    const path = arr[0]; 
    const midPoint = path[Math.floor(path.length/2)];
    const visitedNodes = []  
    const visitedNodesSource = []
    const visitedNodesEnd = []

  // Initialize the distances and previous nodes for each cell
  const distances1 = Array(colSize)
    .fill(null)
    .map(() => Array(rowSize).fill(Infinity));
    

  const distances2 = Array(colSize)
    .fill(null)
    .map(() => Array(rowSize).fill(Infinity));

  // Set the distance for the start and end nodes to 0
  distances1[startNode[0]][startNode[1]] = 0;
  distances2[endNode[0]][endNode[1]] = 0;

  // Initialize the unvisited nodes sets for both the forward and backward searches
  const unvisitedNodesStart = new Set();
  const unvisitedNodesEnd = new Set();
  for (let row = 0; row < colSize; row++) {
    for (let col = 0; col < rowSize; col++) {
      unvisitedNodesStart.add([row, col]);
      unvisitedNodesEnd.add([row, col]);
    }
  }
  
  // Iterate over the unvisited nodes until all nodes have been visited or the search meets in the middle
  while (unvisitedNodesStart.size > 0 && unvisitedNodesEnd.size > 0) {
    // Find the node with the minimum distance for the forward search
    let minDistanceNodeStart = null;
    let minDistanceStart = Infinity;
    for (const node of unvisitedNodesStart) {
      const distance = distances1[node[0]][node[1]];
      if (distance < minDistanceStart) {
        minDistanceStart = distance;
        minDistanceNodeStart = node;
      }
    }


    // Find the node with the minimum distance for the backward search
    let minDistanceNodeEnd = null;
    let minDistanceEnd = Infinity;
    for (const node of unvisitedNodesEnd) {
      const distance = distances2[node[0]][node[1]];
      if (distance < minDistanceEnd) {
        minDistanceEnd = distance;
        minDistanceNodeEnd = node;
      }
    }
    
    if ( minDistanceNodeEnd === null || minDistanceNodeStart === null) {
        break; 
    }
      // Remove the nodes from the unvisited nodes sets
    unvisitedNodesStart.delete(minDistanceNodeStart);
    unvisitedNodesEnd.delete(minDistanceNodeEnd);
   

    if (mazeActive || rowSize === 20) { 
      for(let i of visitedNodesSource) { 
        for(let j of visitedNodesEnd) { 
          if (i[0] === j[0] && i[1] === j[1]) {
            return [path, visitedNodes]
          } 
        }
      }
    }

    //   Update the distances and previous nodes for the neighboring nodes in the forward search
      const neighborsStart = getNeighbors(grid, minDistanceNodeStart, colSize, rowSize);
      for (const neighbor of neighborsStart) {
        if (neighbor[0] === endNode[0] && neighbor[1] === endNode[1]) {
            continue;
        }

        visitedNodesSource.push(neighbor);
        visitedNodes.push(neighbor);

  

        const distance = distances1[minDistanceNodeStart[0]][minDistanceNodeStart[1]] + 1;
        if (
          distance < distances1[neighbor[0]][neighbor[1]] &&
          grid[neighbor[0]][neighbor[1]] !== String.fromCharCode(9654) 
        ) {
          distances1[neighbor[0]][neighbor[1]] = distance;
        }
      }


      
      // Update the distances and previous nodes for the neighboring nodes in the backward search
      if (minDistanceNodeEnd === null) {
        break; 
      }
      const neighborsEnd = getNeighbors(grid, minDistanceNodeEnd, colSize, rowSize);
      for (const neighbor of neighborsEnd) {
        if (neighbor[0] === endNode[0] && neighbor[1] === endNode[1]) {
            continue;
        }

        visitedNodesEnd.push(neighbor);
        visitedNodes.push(neighbor);


        if (neighbor[0] === midPoint[0] && neighbor[1] === midPoint[1] && mazeActive === false) { 
          return [path, visitedNodes]
        }

        const distance = distances2[minDistanceNodeEnd[0]][minDistanceNodeEnd[1]] + 1;
        if (
          distance < distances2[neighbor[0]][neighbor[1]] &&
          grid[neighbor[0]][neighbor[1]] !== String.fromCharCode(9726) 
        ) {
          distances2[neighbor[0]][neighbor[1]] = distance;
        }
      }
    }
    return [path, visitedNodes]
}
    

function getNeighbors(grid, node, colSize, rowSize) {
    const neighbors = [];
    const row = node[0];
    const col = node[1];
    
    if (row > 0 && (grid[row - 1][col].isWall === false)) {
        neighbors.push([row - 1, col]);
    }
    if (row < (colSize - 1) && (grid[row + 1][col].isWall === false)) {
        neighbors.push([row + 1, col]);
    }
    if (col > 0 && (grid[row][col - 1].isWall === false)){ 
        neighbors.push([row, col - 1]);
    }
    if (col < (rowSize - 1) && (grid[row][col + 1].isWall === false) ) {
        neighbors.push([row, col + 1]);
    }
    return neighbors;
    }