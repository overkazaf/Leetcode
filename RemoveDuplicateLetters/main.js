/**
 * @param {string} s
 * @return {string}
 */
var res, tmp;
var removeDuplicateLetters = function(s) {
	res = [];
	tmp = '';
	dp(s,0);
	res.sort();
	console.log(res);
	return res[0];
};

function dp (s, start) {
	if (start == s.length) {
		var ss = new String(tmp);
		res.push(ss);
	} else {
		for (var i = start, l = s.length; i<l ;i++) {
			var c = s.charAt(i);
			var idx = tmp.indexOf(c);
			if (idx == -1) {
				tmp += c;
			} else {
				if (idx != tmp.length-1) {
					dp(s, i+1);
					var arr = tmp.split('');
					arr.splice(idx,1);
					tmp = arr.join('') + c;
					dp(s, i+1);
				}
			}
		}
	}
}

console.log(removeDuplicateLetters('cbacdcbc'))