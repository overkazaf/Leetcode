/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
    var res = [];
    var front, tail;
    for (front = 0, tail = 0; front < nums.length;) {
    	tail = front;
    	while (tail < nums.length-1 && nums[tail] === nums[tail+1]-1) {
    		tail++;
    	}

    	if (front === tail){
    		res.push('' + nums[front]);
    		front++;
    	} else {
    		res.push('' + nums[front] + '->') + nums[tail-1];
    		front = tail + 1;
    	}
    }
};