
var rotate = function (nums, k) {
	var 
		l = nums.length,
		k = k >= l ? k % l : k,
		a = l - k;

	if (l != 1 && k != 0) {
		reverse(nums, 0, a);
		reverse(nums, a, l);
		reverse(nums, 0, l);
	}

	function reverse (arr, from, to) {
		var a = from, b = to-1;
		while (a < b) {
			var t = arr[a];
				arr[a] = arr[b];
				arr[b] = t;
			a++,b--;
		}
	}
};
rotate([1,2], 1);
