/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
  // O(n * log(n))
  const sortedArray = nums.sort((a, b) => a - b);
  const len = sortedArray.length;
  let total = 0;
  // O(n ^ 3) with optimazation
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; ) {
        const tmp = sortedArray[k];
        if (sortedArray[i] + sortedArray[j] > tmp) {
          total++;
          k++;
        } else {
          break;
        }
      }
    }
  }
  return total;
};

var triangleNumber2 = function(nums) {
  // O(n * log(n))
  const sortedArray = nums.sort((a, b) => a - b);
  const len = sortedArray.length;
  let total = 0;
  // O(n ^ 3) with optimazation
  for (let i = len - 1; i >= 2; i--) {
    let j = 0;
    let k = i - 1;
    while (j < k) {
      if (sortedArray[j] + sortedArray[k] > sortedArray[i]) {
        total += k - j;
        k--;
      } else {
        j++;
      }
    }
  }
  return total;
};
