/**
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var countPrimeSetBits = function(L, R) {
  function countOne(s) {
      let cnt = 0;
      for (let i = 0; i < s.length; i++) {
          if (Number.parseInt(s[i], 10) === 1) cnt++;
      }
      return cnt;
  }
  let simplePrimes = [2, 3, 5, 7, 11, 13, 17, 19];
  let result = 0;
  for (let i = L; i <= R; i++) {
      if (simplePrimes.includes(countOne(Number(i).toString(2)))) result++;
  }
  return result;
};