/**
 * @param {number[]} nums
 * @return {number}
 */
var 
	cache,
	mx,
	rob = function(nums) {
	    cache = {},mx = 0, recursive(nums, 0 , nums.length-1);
	    return mx;
	},
	recursive  = function (arr, l, r){
		if (l <= r) {
			var key = l + ',' + r;
			if(key in cache) return cache[key];
			
			cache[key] = 
					   l === r ? 
					   arr[l] : 
					   Math.max(arr[l] + recursive(arr, l+2, r), recursive(arr, l+1, r));

			mx = Math.max(cache[key], mx);
			return +cache[key];
		}
		return 0;
	};
var a = [104,209,137,52,158,67,213,86,141,110,151,127,238,147,169,138,240,185,246,225,147,203,83,83,131,227,54,78,165,180,214,151,111,161,233,147,124,143];
a = [1];
console.log(rob(a));
