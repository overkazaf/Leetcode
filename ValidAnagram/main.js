/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s === '' && t === '') return true;
  if (s && t && s.length === t.length) {
  	return sortString(s) === sortString(t);
  }
  return false;
};

function sortString (s) {
	if (s && s !== '') {
		return s.split('').sort().join('');
	}
	return s;
}

var s = '';
var t = '';

console.log(sortString(s));
console.log(isAnagram(s, t));



