/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    var retVal = 0;
	retVal = dedupFN(nums);
	return retVal;
};