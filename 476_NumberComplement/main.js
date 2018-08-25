/**
 * https://leetcode.com/problems/number-complement/description/
 * 
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    return parseInt(Number(num).toString(2).split('').map(function(digit) {
        return 1-digit;
    }).join(''), 2);
};