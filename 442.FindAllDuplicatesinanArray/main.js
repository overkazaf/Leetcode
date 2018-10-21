/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < 0) {
        result.push(i);
      } else {
        nums[nums[i]] = -nums[nums[i]];
      }
    }
    return result;
};