function kmp(T, P) {
	var n = T.length;
	var m = P.length;
	var j = 0;
	var next = getNext(P);
	console.log(next);

	for (var i = 0; i < n; i++) {
		while(j && P[j] != T[i]) j = next[j];
		if (P[j] == T[i]) {
			j++;
		}

		if (j == m) {
			console.log('found', i-m+1);
			return i-m+1;
		}
	}

	return -1;
}

function getNext(p) {
	var n = p.length;
	var next = [];
	next[0] = next[1] = 0;

	for (var i = 1; i < n; i++) {
		var j = next[i];
		while(j && p[i] != p[j]) j = next[j];
		
		next[i+1] = p[i] == p[j] ? j+1 : 0;
	}

	return next;
}

var a = 'abababcdaabcdabcdabcdefg';
var b = 'abcdabcda';
console.time('aaa');
console.log(kmp(a, b));
console.timeEnd('aaa');

