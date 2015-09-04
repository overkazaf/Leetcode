/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    return sqSum(''+n);
};

cache = {};
function sqSum (n){
	if(n == 1) return true;
	if(n == 0) return false;
	if(n % 10 == 0)return sqSum(''+Math.round(n/10));
	var b = [];
	var cnt = 0;
	var arr = n.split('');
	for(var i=0;i<arr.length;i++) {
		b[cnt++] = arr[i] * arr[i];
	}

	var s = 0;
	for(var j=0;j<cnt;j++) {
		s += b[j];
	}

	if (s in cache){
		return false;
	} else {
		cache[n] = true;
		return sqSum('' + s);
	}
}

console.log(isHappy(23));

