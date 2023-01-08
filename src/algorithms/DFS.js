export function DFS(grid, startNode, endNode, colSize, rowSize) {
    const visitedNodes = []  
  
    // Initialize the unvisited nodes set
    const unvisitedNodes = [[]];
    for (let row = 0; row < colSize; row++) {
      for (let col = 0; col < rowSize; col++) {
        unvisitedNodes.push([row, col]);
      }
    }
  
    // Recursive function that visits all nodes reachable from the given node
    function visit(node) {
      // Add the node to the visited nodes list
      visitedNodes.push([node[0],node[1]]);
  
      // If the node is the end node, stop the search
      if (node[0] === endNode[0] && node[1] === endNode[1]) {
        return true;
      }
  
      // Remove the node from the unvisited nodes set
      unvisitedNodes[node[0]][node[1]] = "X";
  
      // Visit all the reachable neighboring nodes
      const neighbors = getNeighbors(grid, node, colSize, rowSize);
      for (const neighbor of neighbors) {
        if (unvisitedNodes[neighbor[0]][neighbor[1]] !== "X" && 
        grid[neighbor[0]][neighbor[1]] !== String.fromCharCode(9726)) {
          if (visit(neighbor)) {
            return true;
          }
          
        } 
      }
      // If the end node is not reachable from this node, return false

      return false;
    }
  
    // Start the search from the start node
    visit(startNode);

    return [visitedNodes, visitedNodes];
  }
  function getNeighbors(grid, node, colSize, rowSize) {
    const neighbors = [];
    const [row, col] = node;
    if (row > 0) neighbors.push([row - 1, col]);
    if (row < colSize - 1) neighbors.push([row + 1, col]);
    if (col > 0) neighbors.push([row, col - 1]);
    if (col < rowSize - 1) neighbors.push([row, col + 1]);
    return neighbors.filter(([r, c]) => grid[r][c].isWall === false);
  }