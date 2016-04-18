/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
	if (num === 1) return true;
    if (num < 4) return false;

    return (num % 4 === 0) && isPowerOfFour(Math.floor(num/4));
};

function log (k, v) {
	console.log(k, v);
}
log(Math.floor(5/4))
log(4, isPowerOfFour(4))
log(16, isPowerOfFour(16))
log(5, isPowerOfFour(5))