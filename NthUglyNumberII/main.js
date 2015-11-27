/**
 * @param {number} n
 * @return {number}
 */
var arr = [1, 2, 3, 4, 5];
var nthUglyNumber = function(n) {
    if (n > arr.length) {
    	buildUgly(n);
    }
    return arr[n-1];
};

function min (a, b, c) {
	return Math.min(a, Math.min(b, c));
}

function getIndex (target, l) {
	var j = l;
	while (arr[j] != target) j--;

	return j;
}

function getNextUgly (len, base) {
	var l = len, ret, last = arr[arr.length-1];
	while(l >=0 && arr[l] % base != 0) l--;
	
	if (l >= 0) {
		var temp = Math.floor(arr[l] / base);
		var index = getIndex(temp, l);
		while((ret = arr[++index] * base) < last);
	} else {
		ret = base * last;
	}

	return ret;
}

function buildUgly (n) {
	var a, b, c, l;
	while (arr.length < n) {
		var l = arr.length - 1;
		a = getNextUgly(l,2);
		b = getNextUgly(l,3);
		c = getNextUgly(l,5);

		arr.push(min(a,b,c));
	}
}

// var args = process.argv.slice(2);
// nthUglyNumber(parseInt(args));