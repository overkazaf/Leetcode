/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  const revArray1 = num1.split('').reverse();
  const revArray2 = num2.split('').reverse();
  const result = [];
  const l1 = revArray1.length;
  const l2 = revArray2.length;
  const maxL = Math.max(l1, l2);
  for (let i = 0; i < maxL; i++) {
    let cur = (+revArray1[i] || 0) + (+revArray2[i] || 0) + (result[i] || 0);
    result[i] = cur % 10;
    result[i+1] = Math.floor(cur / 10);
  }
  const tmp = result.reverse();
  while (tmp[0] === 0 && tmp.length > 1) tmp.shift();
  return tmp.join('');
};