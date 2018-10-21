/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
  let l = 0;
  let r = Math.floor(Math.sqrt(c));
  while (l <= r) {
    const sum = l * l + r * r;
    if (sum === c) {
      return true;
    } else if (sum < c) {
      l++;
    } else {
      r--;
    }
  }
  return  false;
};