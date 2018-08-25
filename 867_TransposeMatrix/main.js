/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var transpose = function(A) {
	/**
	 * Input: [[1,2,3],[4,5,6],[7,8,9]]
	 * Output: [[1,4,7],[2,5,8],[3,6,9]]
	 */
	var row = A.length;
	var col = A[0].length;
	var res = [];

	for (var j = 0; j < col; j++) {
		res[j] = [];
		for (var i = 0; i < row; i++) {
			res[j][i] = A[i][j];
		}
	}

	return res;
};