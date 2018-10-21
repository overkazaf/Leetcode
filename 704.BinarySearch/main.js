/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  let resultIndex = -1;
  while (low <= high) {
    let mid = (low + high) >> 1;
    if (target > nums[mid]) {
      low = mid + 1;
    } else if (target < nums[mid]) {
      high = mid - 1;
    } else {
      resultIndex = mid;
      break;
    }
  }
  return resultIndex;
};

const arr = [1, 23, 5, 342, -3, 4, 34].sort((a, b) => a - b);
console.log(arr, search(arr, 5));