/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var 
	res, 
	temp,
	globalK, 
	globalN;

var combinationSum3 = function(k, n) {
    if (k === 0) return;
    res = [];
    temp = [];
    globalK = k;
    globalN = 9;
    backtrack(k, n);
    return res;
};

var backtrack = function (k, n) {
	if (k === 0) {
		if (n === 0 && temp.length === globalK) {
			res.push(temp.slice(0));	
		}
	} else {
		for (var i = 1; i <= globalN; i++) {
			if (temp.indexOf(i) === -1 && i <= n && ((!temp.length) || (i > temp[temp.length-1]))) {
				temp.push(i);
				console.log('i has been pushed:' + i);
				backtrack(k-1, n - i);
				temp.length = temp.length-1;
			}
		}
	}
}

console.log(combinationSum3(3, 9));