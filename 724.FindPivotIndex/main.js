/**
 * @param {number[]} nums
 * @return {number}
 */
function rangeSum(arr, l, r) {
  let s = 0;
  for (let i = l; i <= r; i++) s += arr[i];
  return s;
}

var pivotIndex = function(nums) {
  let pivot = -1;
  for (let i = 0; i < nums.length; i++) {
      if (rangeSum(nums, 0, i) === rangeSum(nums, i, nums.length - 1)) {
          pivot = i;
          // found left-most result
          break;
      }
  }
  return pivot;
};