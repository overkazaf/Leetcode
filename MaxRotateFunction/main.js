/**
 * @param {number[]} A
 * @return {number}
 */
var maxRotateFunction = function(A) {
    let result = calcRotate(A);
    return maxNum(result);
};

function calcRotate(arr) {
	var res = [];
	for (var i = 0, l = arr.length; i<l; i++) {
		res.push(calc(arr, i));
	}

	return res;
}

function calc(arr, j) {
	var res = 0;
	for (var i = 0, l = arr.length; i < l; i++) {
		var rotIndex = j+i < l ? i+j : i+j-l;
		res += (rotIndex)*arr[i];
	}

	return res;
}

function maxNum(nums) {
	let l = nums.length;
	if (!l) return 0;

	if (l === 1) {
		return nums[0];
	} else {
		let head = nums.shift();
		return Math.max(head, maxNum(nums));
	}
}

console.log(maxRotateFunction([1,2,3,4]));

