/**
 * @constructor
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.cache = {};
    this.nums = nums;
    this.length = 0;
};

var calcSum = function (arr, i, j) {
	var x, s = 0;
	for (x = i; x <= j; x++) {
		s += arr[x];
	}
	return s;
}

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
	var key = i + '->' + j;
    if (key in this.cache) {
    	return this.cache[key];
    } else {
    	var s;
    	if (this.length === 0) {
    		s = calcSum(this.nums, i, j);
    	} else {
    		
    	}

    	this.length++;
    	
    	return (this.cache[key] = s);
    }
};


/**
 * Your NumArray object will be instantiated and called as such:
 * var numArray = new NumArray(nums);
 * numArray.sumRange(0, 1);
 * numArray.sumRange(0, 2);
 */