/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
	var n = num,
		i = 0,
		flag = false;

	for (; i < 32; i++) {
		//log(i + ' :: n&1', n&1)
		if (n&1) {
			if (i % 2 !== 0) break;
			else {
				//log(i + ' :: n^1', n^1)
				if (!(n^1)) {
					flag = true;
				}
				break;
			}
		}
		n >>>= 1;
	}
	return flag;
};

function log (k, v) {
	console.log(k, v);
}

for (var j = 1; j < 480; j++) {
	log(j, isPowerOfFour(j))
}