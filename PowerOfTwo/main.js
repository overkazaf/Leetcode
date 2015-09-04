/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
    while (n) {
    	if (n == 1) return true;
    	if (n & 1) {
    		return false;
    	}
    	n >>= 1;
    }
    return false;
};