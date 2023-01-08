
export function shortestPath(grid, startNode, endNode, colSize, rowSize) {
  const visitedNodes = []  
  // Initialize the distances and previous nodes for each cell
  const distances = Array(colSize)
    .fill(null)
    .map(() => Array(rowSize).fill(Infinity));
  const prevNodes = Array(colSize)
    .fill(null)
    .map(() => Array(rowSize).fill(null));

  // Set the distance for the start node to 0
  distances[startNode[0]][startNode[1]] = 0;

  // Initialize the unvisited nodes set
  const unvisitedNodes = new Set();
  for (let row = 0; row < colSize; row++) {
    for (let col = 0; col < rowSize; col++) {
      unvisitedNodes.add([row, col]);
    }
  }

  let flag = true; 
  // Iterate over the unvisited nodes until all nodes have been visited
  while (unvisitedNodes.size > 0) {
    // Find the node with the minimum distance
    let minDistanceNode = null;
    let minDistance = Infinity;
    for (const node of unvisitedNodes) {
      const distance = distances[node[0]][node[1]];
      if (distance < minDistance) {
        minDistance = distance;
        minDistanceNode = node;
      }
    }

    // Remove the node from the unvisited nodes set
    unvisitedNodes.delete(minDistanceNode);

    // Update the distances and previous nodes for the neighboring nodes
    if (minDistanceNode === null) {
      break; 
    }


    const neighbors = getNeighbors(grid, minDistanceNode, colSize, rowSize);
    for (const neighbor of neighbors) {
      if (neighbor[0] === endNode[0] && neighbor[1] === endNode[1]) {
        flag = false;
      }
      if (flag) {
        visitedNodes.push(neighbor);
      }
      
      const distance = distances[minDistanceNode[0]][minDistanceNode[1]] + 1;
      if (
        distance < distances[neighbor[0]][neighbor[1]] &&
        grid[neighbor[0]][neighbor[1]] !== String.fromCharCode(9654) 
      ) {
        distances[neighbor[0]][neighbor[1]] = distance;
        prevNodes[neighbor[0]][neighbor[1]] = minDistanceNode;
      }
    }
  }

  // Trace the shortest path from the end node to the start node
  const shortestPath = [endNode];
  let currentNode = endNode;
  if (currentNode === null) { 
    return [null, visitedNodes];
  }
  while (currentNode[0] !== startNode[0] || currentNode[1] !== startNode[1]) {
    currentNode = prevNodes[currentNode[0]][currentNode[1]];
    shortestPath.unshift(currentNode);

    if (currentNode === null) { 
      return [null, visitedNodes];
    }
  }
  return [shortestPath, visitedNodes];
}

function getNeighbors(grid, node, colSize, rowSize) {
  const neighbors = [];
  const row = node[0];
  const col = node[1];

  if (row > 0 && grid[row - 1][col].isWall === false) {
    neighbors.push([row - 1, col]);
  }
  if (row < (colSize - 1) && grid[row + 1][col].isWall === false) {
    neighbors.push([row + 1, col]);
  }
  if (col > 0 && grid[row][col - 1].isWall === false){ 
    neighbors.push([row, col - 1]);
  }
  if (col < (rowSize - 1) && grid[row][col + 1].isWall === false) {
    neighbors.push([row, col + 1]);
  }
  return neighbors;
}