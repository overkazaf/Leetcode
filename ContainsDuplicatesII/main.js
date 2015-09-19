/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  var cache = {};

  for (var i = 0; i < nums.length; i++) {
  	if (!(('' + nums[i]) in cache)) {
  		cache['' + nums[i]] = i;
  	} else {
  		cur = cache['' + nums[i]];
  		if (i - cur <= k) {
  			return true;
  		} else {
  			cache['' + nums[i]] = i;
  		}
  	}
  }  
  return false;
};
var a = [-1, -1];
console.log(containsNearbyDuplicate(a, 1));