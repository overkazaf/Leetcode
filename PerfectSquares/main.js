/**
 * @param {number} n
 * @return {number}
 */
var squareArr,
	sqrtN;

function genSquareArr (n) {
	var arr = [];
	for (var i = 1; i <= sqrtN; i++) {
		arr.push(i*i);
	}
	return arr;
};
var numSquares = function(n) {
	sqrtN = Math.floor(Math.sqrt(n));
    squareArr = genSquareArr(n);
    log(squareArr);
    for (var i = 1; i < n; i++) {
    	if(canSplit(n, i)){
    		return i;
    	}
    }
    return n;
};

var canSplit  = function (num, parts) {
	if(parts <= 0) return false;
	if (num === 0) {
		return true;
	} else {
		for (var i = squareArr.length-1; i >= 0; i--) {
			if (squareArr[i] <= num) {
				if (num % squareArr[i] === 0 && num / squareArr[i] === parts) {
					return true;
				}
				var flag = canSplit(num-squareArr[i], parts-1);
				if(flag){
					return true;
				}
			}
		}
		return false;
	}
};



var tests = 13;

var log = function (k){
	console && console.log(k);
};

log(numSquares(tests));