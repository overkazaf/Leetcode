/**
 * @param {number} n
 * @return {number}
 */
var cache = {};
var nthUglyNumber = function(n) {
	if (n < 1) return 0;
	var l = [1];
	while (l.length < n) {
		var l1 = produce(l,2);
		var l2 = produce(l,3);
		var l3 = produce(l,5);
		var i,j,k;
		i = 0, j = 0, k = 0;
		while (i < l1.length || j < l2.length || k < l3.length) {
			var m = Math.min(l1[i], l2[j], l3[k]);
			l.push(m);if(l.length === n)break;
			if (i < l1.length && m === l1[i]){
				i++;continue;
			}
			if (j < l2.length && m === l2[j]){
				j++;continue;
			}
			if (k < l3.length && m === l3[k]){
				k++;continue;
			}
			
		} 
	}
	console.log(l);
	return l[n-1];

};

var produce = function (list, radix){
	var res = [];
	for (var i = 0; i < list.length; i++) {
		res.push(list[i] * radix);
	}
	return res;
};


var arr = [3,12,23,4,10,5];
for (var i=0; i<arr.length; i++){
	console.log(nthUglyNumber(arr[i]));
}