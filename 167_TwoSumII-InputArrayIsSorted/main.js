/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let res = [];
  let low = 0;
  let high = numbers.length - 1;

  for (let i = low; i < high; i++) {
    if (numbers.indexOf(target - numbers[i], i + 1) >= 0) {
      res = [ i + 1, numbers.indexOf(target - numbers[i], i + 1) + 1];
      break;
    }
  }

  return res;
};
