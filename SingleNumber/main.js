/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
  var i, j, k, l = nums.length;
  k = 0;
  for (i=0; i<l; i++) {
  	k ^= nums[i];
  }

  for (j=0; j<32; j++) {
  	if ((k >> j) & 1 == 1)break;
  }

  var n1 = 0, 
  	  n2 = 0;
  for (i=0; i<l; i++) {
  	if ((nums[i] >> j) & 1 == 1) {
  		n1 ^= nums[i];
  	} else {
  		n2 ^= nums[i];
  	}
  }

  return [k^n1, k^n2];
};