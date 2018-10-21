/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  this.arr = nums.sort((a, b) => a - b);
  this.k = k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  let l = 0;
  let r = this.arr.length;
  let arr = [...this.arr];
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] > val) {
      r = m;
    } else if (arr[m] < val) {
      l = m + 1;
    } else {
      break;
    }
  }
  arr.splice(l, 0, val);
  
  return arr[arr.length - this.k];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = Object.create(KthLargest).createNew(k, nums)
 * var param_1 = obj.add(val)
 */
