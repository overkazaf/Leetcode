/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t, dedup) {
  if (s === '') return true;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i);
    let j = 0;
    while (t.charAt(j) !== ch) j++;
    if (j === t.length || t.length - j < s.length - i) return false;
    
  }
  return true;
};
