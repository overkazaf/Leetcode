/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    var 
    	p1, // zero pointer
    	p2, // non-zero pointer
    	l = nums.length;
    for (p1 = 0, p2 = 0; p2 < l; p2++) {
    	if (nums[p2] !== 0) {
    		if (p1 !== p2) {
    			nums[p1] = nums[p2];
    		}
    		p1++;
    	}
    }
    while (p1 < l) nums[p1++] = 0;
};

var a = [0, 1, 0, 3, 12];
console.log(moveZeroes(a));