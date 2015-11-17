/**
 * @constructor
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.sum = [];
    var s = 0;
    for (var i=0, l = nums.length; i<l; i++) {
        s += nums[i];
        this.sum[i] = s;
    }
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    if (i === 0) {
        return this.sum[j];
    } else {
        return this.sum[j] - this.sum[i-1];
    }

};


/**
 * Your NumArray object will be instantiated and called as such:
 * var numArray = new NumArray(nums);
 * numArray.sumRange(0, 1);
 * numArray.sumRange(0, 2);
 */