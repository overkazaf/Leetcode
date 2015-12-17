/**
 * @param {number[]} nums
 * @return {number}
 */
var lis,
	temp;
var lengthOfLIS = function(nums) {
    var i,
        l = nums.length;

    lis = 0;
    
    for (i = 0; i < l; i++) {
    	temp = 1;
    	LIS(i, nums);
    }
    
    return lis;
};

function LIS (curIndex, arr) {
	if (curIndex == arr.length) {
		if (temp > lis){
			lis = temp;
		}
		return;
	}
	if (arr.length - curIndex > lis) {
		// 有可能往下做的时候才测试
		for (var i = curIndex+1; i < arr.length; i++) {
			if (arr[curIndex] < arr[i]) {
				temp++;
				LIS(i, arr);
				temp--;
			}
		}
	}
}