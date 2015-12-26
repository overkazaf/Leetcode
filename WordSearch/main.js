/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    for (var i = 0, l = board.length; i < l; i++) {
    	for (var j = 0, m = board[0].length; j < m; j++) {
    		if (dfs(board, i, j, word)) {
    			return true;
    		}
    	}
    }
    return false;
};

function dfs (arr, i, j, word) {
	if (!word || word.length == 0) return true;

	if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length) return false;

	var ret = false,
		c = word.charAt(0),
		next;

	if (arr[i][j] == c) {
		arr[i][j] = '*';
		next = word.substring(1);
		ret = dfs(arr, i-1, j, next) || dfs(arr, i+1, j, next) || dfs(arr, i, j-1, next) || dfs(arr, i, j+1, next);
		arr[i][j] = c;
	}

    return ret;
}