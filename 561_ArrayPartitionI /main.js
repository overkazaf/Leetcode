/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
    return nums.sort(function(a, b) {
        return a - b;
    }).filter(function(n, index) {
        return index % 2 === 0;
    }).reduce(function(x, y) {
        return x + y;
    });
};