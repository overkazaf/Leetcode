/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    var dict = {};
    s = s.split('');
    for (var i = 0, l = s.length; i < l; i++) {
    	if (s[i] in dict) {
    		dict[s[i]] += 1;
    	} else {
    		dict[s[i]] = 1;
    	}
    }
    var target = Object.keys(dict).sort(function(a, b) {
    	var lowerA = a.toLowerCase();
    	var lowerB = a.toLowerCase();
    	if (lowerA != lowerB) {
    		return dict[b] - dict[a];
    	} else {
    		return dict[b] - dict[a];
    	}
    	
    });

    var t = [];
    for (var j = 0, l = target.length; j < l; j++) {
    	var times = dict[target[j]];
    	while (times-- > 0) {
    		t.push(target[j]);
    	}
    }

    return t.join('');
};

console.log(frequencySort('aAbb'));