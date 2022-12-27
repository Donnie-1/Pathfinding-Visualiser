



export function shortestPath(grid, startNode, endNode) {
  const unvisitedNodes = grid.flat();
  console.log(unvisitedNodes[1], grid);
  for (let i = 0; i < unvisitedNodes.length; i++) {
    const node = unvisitedNodes[i];
    node[2] = Number.MAX_SAFE_INTEGER;
    node[3] = null;
  }

  startNode[2] = 0;

  while (unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA[2] - nodeB[2]);
    const currentNode = unvisitedNodes.shift();

    if (currentNode[0] === endNode[0] && currentNode[1] === endNode[1]) {
      // Tracing back the path from the end node to the start node
      let current = currentNode;
      const shortestPath = [];
      while (current) {
        shortestPath.unshift(current);
        current = current[3];
      }
      return shortestPath;
    }

    if (currentNode[2] === Number.MAX_SAFE_INTEGER) {
      continue;
    }

    const neighbors = getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const distance = currentNode[2] + neighbor[1];
      if (distance < neighbor[2]) {
        neighbor[2] = distance;
        neighbor[3] = currentNode;
      }
    }
  }
}

function getNeighbors(grid, node) {
  const neighbors = [];
  const [row, col] = node;

  if (row > 0 ) {
    neighbors.push([row - 1, col]);
  }
  if (col < 19 ) {
    neighbors.push([row, col + 1]);
  }
  if (row < 34 ) {
    neighbors.push([row + 1, col]);
  }
  if (col > 0 ) {
    neighbors.push([row, col - 1]);
  }

  return neighbors;
}
