/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  
  return s.split(' ').map(word => {
  	return word.split('').reverse().join('');
  }).join(' ');
};