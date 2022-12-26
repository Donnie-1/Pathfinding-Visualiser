


export function shortestPath(grid, startNode, endNode) {
    // Initialize the distances and previous nodes for each cell
    const distances = Array(35)
      .fill(null)
      .map(() => Array(20).fill(Infinity));
    const prevNodes = Array(35)
      .fill(null)
      .map(() => Array(20).fill(null));
  
    // Set the distance for the start node to 0
    distances[startNode[0]][startNode[1]] = 0;
  
    // Initialize the unvisited nodes set
    const unvisitedNodes = new Set();
    for (let row = 0; row < 35; row++) {
      for (let col = 0; col < 20; col++) {
        unvisitedNodes.add([row, col]);
      }
    }
  
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
      const neighbors = getNeighbors(minDistanceNode);
      for (const neighbor of neighbors) {
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
    while (currentNode[0] !== startNode[0] || currentNode[1] !== startNode[1]) {
      currentNode = prevNodes[currentNode[0]][currentNode[1]];
      shortestPath.unshift(currentNode);
    }
    return shortestPath
  }
  function getNeighbors(node) {
    const neighbors = [];
    const row = node[0];
    const col = node[1];
    if (row > 0) neighbors.push([row - 1, col]);
    if (row < 34) neighbors.push([row + 1, col]);
    if (col > 0) neighbors.push([row, col - 1]);
    if (col < 19) neighbors.push([row, col + 1]);
    return neighbors;
  }