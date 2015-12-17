var cache = {};
function groupSplit (arr, size) {
	if (Object.prototype.toString.call(arr) !== '[object Array]') throw new Error('Please pass a valid array as the first argument');
	if (arguments.length !== 2) throw new Error('Please check your arguments, which should be arr and size');
	if (isNaN(size)) throw new Error('The second parameter should be an interger');
	if (size < 0 || size > arr.length) throw new Error('Size parameter is illegal');

	var result = [], 
		tmp    = [],
		l      = arr.length,
		key    = arr.join('&') + '_' + size;
	
	if (key in cache) return cache[key];

	(function (arr, size, current){
		if (size == 0) {
			result.push(tmp.slice(0));
		} else {
			for (var j = current; j < l; j++) {
				tmp.push(arr[j]);
				arguments.callee.call(null, arr, size-1, j+1);
				tmp.pop();
			}
		}
	})(arr, size, 0);

	return (cache[key] = result);
};

var test = [1,2,3,4,5,6,7,8];
console.log(groupSplit(test, 3));
// console.log(groupSplit(test, -1));
// console.log(groupSplit(test, 2));
// console.log(groupSplit(test, 10));
// console.log(groupSplit(null, 10));
// console.log(groupSplit(test, '13'));