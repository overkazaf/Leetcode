/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

var searchMatrix = function(matrix, target) {
	if(matrix == null || matrix.length < 1 || matrix[0].length <1) {
        return false;
    }
	var 
		x = matrix.length,
		y = matrix[0].length,
		i, j,k;
	
	i = 0; j = y-1;

	while (i < x && j >= 0) {
		k = matrix[i][j];
		if (k === target) {
			return true;
		} else if (k < target) {
			i++;
		} else {
			j--;
		}
	}
    return false;
};

