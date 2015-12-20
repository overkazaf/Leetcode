/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function(n) {
    var cnt = 0;
    for (var i = 1; i <= n; i++) {
        if (isSquareN(i)) {
            cnt++;
        }
    }
    return cnt;
};

var MAX_DIGIT = 1000000000;
function isSquareN (n) {
	return Math.sqrt(n)*MAX_DIGIT % MAX_DIGIT == 0;
}


for (var i=3; i<20; i++) {
	console.log(i,bulbSwitch(i));
}
