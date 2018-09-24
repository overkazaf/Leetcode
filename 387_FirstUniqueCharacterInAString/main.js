/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const countMap = {};
    const firstChar = s.split('').map(char => {
      if (!countMap[char]) {
        countMap[char] = 0;
      }
      countMap[char]++;
      return char;
    }).filter(char => {
      return countMap[char] === 1;
    })[0];
    return s.indexOf(firstChar);
};