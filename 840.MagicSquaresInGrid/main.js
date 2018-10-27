/**
 * @param {number[][]} grid
 * @return {number}
 */
function checkMagicGrid(grid, x, y) {
  let set = new Set();
  for (let i = 0; i < 3; i++) {
      let rowSum = 0;
      for (let j = 0; j < 3; j++) { 
          set.add(grid[x+i][y+j]);
          rowSum += grid[x+i][y+j];
      }
      if (rowSum !== 15) return false;
  }
  
  let numberCheck = Array.from(set).filter(i => i > 0 & i < 10).length === 9;
  if (numberCheck) {
      let colSumCheck = [0, 1, 2].every(col => {
          return grid[x][y + col] + grid[x + 1][y + col] + grid[x + 2][y + col] === 15;
      });
      if (!colSumCheck) return false;
      return (grid[x][y] + grid[x + 1][y + 1] + grid[x + 2][y + 2] === 15) && 
              (grid[x][y + 2] + grid[x + 1][y + 1] + grid[x + 2][y] === 15);
  }
  return false;
}
var numMagicSquaresInside = function(grid) {
  let cnt = 0;
  for (let i = 0; i + 2 < grid.length; i++) {
      for (let j = 0; j + 2 < grid[0].length; j++) {
          if (checkMagicGrid(grid, i, j)) cnt++;
      }
  }
  return cnt;
};