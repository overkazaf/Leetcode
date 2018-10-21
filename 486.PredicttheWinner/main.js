/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function(nums) {
  const player = {
    p1: 0,
    p2: 0,
  };

  for (let i = 0, j = nums.length - 1, k = 1; i <= j; k++) {
    const v1 = Math.max(nums[i], nums[j - 1]);
    const v2 =  Math.max(nums[i + 1], nums[j]);
    const key = k % 2 === 1 ? 'p1' : 'p2';
    if (v1 === v2) {
      // 相等的话，取对自己有利的拿法
      if (nums[i] >= nums[j]) {
        player[key] += nums[i++];
      } else {
        player[key] += nums[j--];
      }
    } else {
      const nextKey = k % 2 === 1 ? 'p2' : 'p1';
      
      // if (v1 > v2) {
      //   // 拿尾部的话，会让下一次对手取得的值更大，不应做这个操作
      //   player[key] += nums[i++];
      // } else {
      //   player[key] += nums[j--];
      // }
    }
  }
  
  console.log(player.p1, player.p2);
  return player.p1 >= player.p2;
};