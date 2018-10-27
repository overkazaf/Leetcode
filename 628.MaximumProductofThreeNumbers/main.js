/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
  const arr = nums.sort((a, b) => a - b);  
  let l = arr.length;
  let tmp = arr[ l - 3 ] * arr[ l - 2 ] * arr[ l - 1 ];
  if (arr[0] < 0 && arr[1] < 0) {
      return Math.max(arr[0] * arr[1] * arr[l - 1], tmp);
  } else {
      return tmp;
  }
};