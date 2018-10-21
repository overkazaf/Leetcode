/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  let slow = nums[0];
  let fast = nums[nums[0]];
  while (slow != fast) {
    // 问题转化为单链表成环中入边>1的节点的查找，可以利用快慢指针，直到找到第一个环
    // 慢指针一次走一步，快指针一次走两步
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  fast = 0;
  while (fast != slow) {
    // fast先行，直到找到和slow相等的值
    fast = nums[fast];
    slow = nums[slow];
  }
  return slow;
};
