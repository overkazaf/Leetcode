/**
 ** @param {number} num
 ** @return {number[]}
 **/
var countBits = function(num) {
	var ret = [];
    for (var i = 0; i <= num; i++) {
	    ret[i] = getBits(i);
	}
	return ret;
};

var cache = {};
function getBits (n) {
    if (n in cache) return cache[n];

	var cnt = 0,
		t = n;
	for (var i = 0; i < 32; i++) {
	    if (t&1)cnt++;
		t >>>= 1;
	}

	cache[n] = cnt;
	return cache[n];
}
