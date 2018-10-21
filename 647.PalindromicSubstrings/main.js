/**
 * @param {string} s
 * @return {number}
 */
function isPalindromicString(s, start, len) {
  const str = s.substr(start, len);
  if (str in palindromicMap) {
    return true;
  }
  for (let i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str.charAt(i) !== str.charAt(j)) {
      return false;
    }
  }
  palindromicMap[str] = true;
  return true;
}

let palindromicMap;
var countSubstrings = function(s) {
  if (s.length === 0) return 0;
  if (s.length === 1) return 1;
  let count = 0;
  palindromicMap = {};
  for (let i = 0; i < s.length; i++) {
    for (let j = 1; i+j <= s.length; j++) {
      if (isPalindromicString(s, i, j)) {
        count++;
      }
    }
  }
  return count;
};
