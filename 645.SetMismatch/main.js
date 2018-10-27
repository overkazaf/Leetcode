/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function(nums) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
      if (!map[nums[i]]) map[nums[i]] = 0;
      map[nums[i]]++;
  }
  let repeated, missed;
  for (let i = 0; i < nums.length; i++) {
      if (map[i+1] > 1) repeated = i + 1;
      else {
          if (typeof map[i+1] === 'undefined') missed = i + 1;
      }
  }
  return [ repeated, missed ];
};