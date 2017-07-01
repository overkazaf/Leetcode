/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
	var m1 = m2 = m3 = -Infinity;

	nums.forEach(function(n) {
		if (n > m1) {
			m3 = m2;
			m2 = m1;
			m1 = n;
		} else if (n === m1) {
			continue;
		} else if (n > m2) {
			m3 = m2;
			m2 = n;
		} else if (n === m2) {
			continue;
		} else if (n > m3) {
			m3 = n;
		}
	});

	return m3 === -Infinity ? m1 : m3;
};