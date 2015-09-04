/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    var arr = [];
    while (n) {
    	arr[arr.length] = n&1;
    	n = Math.floor(n/2);
    };
    while (arr.length < 32) {
    	arr[arr.length] = 0;
    }
    
    return s<0 ? (() ? 2147483648 : (2147483648 + s)) : s;
};

console.log(reverseBits(4294967295));