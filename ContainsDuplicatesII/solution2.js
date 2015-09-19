/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  
  for (var i = 0; i < nums.length; i++) {
  	for (var j = i+1; j < nums.length; j++) {
      if (nums[i] === nums[j] && j - i <= k) {
        return true;
      }
    }
  }  
  return false;
};
var a = [-1, -1];
console.log(containsNearbyDuplicate(a, 1));