/**
 * @param {number} n
 * @return {number}
 */


function rev(x) {
  return Number(('' + x).split('').reverse().join(''));
}

var largestPalindrome = function(n) {
  if (n === 1) { return 9; }
  const maxN = 10 ** n;
  const maxNum = maxN - 1;
  for (let i = maxNum; i >= Math.floor(maxNum / 10); i--) {
    for (let j = maxNum; j >= i; j--) {
      const palindrome = i * maxN + rev(i);
      if (isPalindrome(palindrome) && palindrome % j === 0) {
        return palindrome % 1337;
      }
    }
  }
};

function isPalindrome(n) {
  const str = '' + n;
  for (let i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      return false;
    }
  }
  return true;
}
console.log(largestPalindrome(8))