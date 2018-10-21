/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    return nums.reduce((prev, curr) => { return prev ^ curr; }, 0);
};

var singleNonDuplicate = function(nums) {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    // m 必为整数，因为数组长定为 2k + 1
    let m = (l + r) >> 1;
    // 如果m和m+1相等，m向前推一位做判断，m永远指向第二个重复值
    if (nums[m] === nums[m+1]) m -= 1;
    if ((m - l) % 2 === 0) {
      // 说明前边的数组有奇数个数，非重复值在前边
      r = m;
    } else {
      l = m + 1;
    }
  }
  return nums[l];
};
