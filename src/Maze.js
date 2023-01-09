export function generateMaze(rowSize, colSize) {
  let grid = [];
  for (let row = 0; row < rowSize; row++) {
    let currentRow = [];
    for (let col = 0; col < colSize; col++) {
      currentRow.push(1);
    }
    grid.push(currentRow);
  }
  

  let startRow = 0
  let startCol = 0
  
  grid[startRow][startCol] = 0;
  
  let visited = [[startRow, startCol]];
  
  while (visited.length > 0) {
    let posIndex = Math.floor(Math.random() * visited.length);
    let pos = visited[posIndex];
    let row = pos[0];
    let col = pos[1];
    
    let neighbors = getValidNeighbors(grid, row, col, rowSize, colSize);
    
    if (neighbors.length > 0) {
      let neighborIndex = Math.floor(Math.random() * neighbors.length);
      let neighbor = neighbors[neighborIndex];
      let neighborRow = neighbor[0];
      let neighborCol = neighbor[1];
      
      grid[(row + neighborRow) / 2][(col + neighborCol) / 2] = 0;
      
      grid[neighborRow][neighborCol] = 0;
      visited.push([neighborRow, neighborCol]);
    } else {
      visited.splice(posIndex, 1);
    }
  }

  let walls = [];
  for (let row = 0; row < rowSize; row++) {
    for (let col = 0; col < colSize; col++) {
      if (grid[row][col] === 1) {
        walls.push([row, col]);
      }
    }
  }
  return walls;
}

function getValidNeighbors(grid, row, col, rowSize, colSize) {
  let neighbors = [];
  if (row > 1 && grid[row - 2][col] === 1) {
    neighbors.push([row - 2, col]);
  }
  if (row < rowSize - 2 && grid[row + 2][col] === 1) {
    neighbors.push([row + 2, col]);
  }
  if (col > 1 && grid[row][col - 2] === 1) {
    neighbors.push([row, col - 2]);
  }
  if (col < colSize - 2 && grid[row][col + 2] === 1) {
    neighbors.push([row, col + 2]);
  }
  return neighbors;
}