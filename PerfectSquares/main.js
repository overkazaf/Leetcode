/**
 * @param {number} n
 * @return {number}
 */
var squareArr,
	sqrtN;
var numSquares = function(n) {
    squareArr = genSquareArr(n);
    sqrtN = Math.floor(Math.sqrt(n));
    for (var i = 1; i < n; i++) {
    	if(canSplit(n, i)){
    		return i;
    	}
    }
    return n;
};

var canSplit  = function (num, parts) {
	if (num === 0) {
		return true;
	} else {
		for (var i = squareArr.length-1; i >= 0; i--) {
			if (squareArr[i] <= num) {
				if (num % squareArr[i] === 0 && num / squareArr[i] === parts) {

				}
				var flag = canSplit(num-squareArr[i], parts-1);
			}
		}
		return false;
	}
};

var genSquareArr = function (n) {
	var arr = [];
	for (var i = 1; i <= sqrtN; i++) {
		arr.push(i*i);
	}
	return arr;
}