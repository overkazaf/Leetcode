/**
 * @constructor
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
	var i, j, 
		m = matrix.length, n;
    this.sum = [];
    for (i = 0; i<m; i++) {
    	this.sum[i] = [];
    	n = matrix[i].length;
    	for (j=0; j<n; j++) {
    		if (i > 0 && j > 0) {
    			this.sum[i][j] = matrix[i][j] + this.sum[i][j-1] + this.sum[i-1][j] - this.sum[i-1][j-1];
    		} else {
    			if (i == 0 && j == 0) {
    				this.sum[i][j] = matrix[i][j];
    			} else {
    				if (i == 0) {
    					this.sum[i][j] = matrix[i][j] + this.sum[i][j-1];
    				}

    				if (j == 0) {
    					this.sum[i][j] = matrix[i][j] + this.sum[i-1][j];
    				}
    			}
    		}
    	}
    }
};

NumMatrix.prototype.getSum  = function (row, col) {
	if (row < 0 || col < 0) {
		return 0;
	} else {
		return this.sum[row][col];
	}
}
/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
	var A, B, C, D;
	D = this.getSum(row2, col2);
	C = this.getSum(row2, col1-1);
	B = this.getSum(row1-1, col2);
	A = this.getSum(row1-1, col1-1);
    return D - C - B + A;
};


/**
 * Your NumMatrix object will be instantiated and called as such:
 * var numMatrix = new NumMatrix(matrix);
 * numMatrix.sumRegion(0, 1, 2, 3);
 * numMatrix.sumRegion(1, 2, 3, 4);
 */