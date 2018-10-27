/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function(nums) {
  if (nums.length === 1) return 0;
  const arr = [...nums].sort((a, b) => b - a);
  if (arr[0] >= 2 * arr[1]) {
      return nums.indexOf(arr[0]);
  } else {
      return -1;
  }
};