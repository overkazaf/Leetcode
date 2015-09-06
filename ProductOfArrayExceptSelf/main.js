/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
   var before = [],
   	   after  = [],
   	   l      = nums.length;
   before[0] = before[l] = after[0] = after[l-1] = 1;
   for (var i = 2; i <= l; i++) {
   	before[i-1] = nums[i-2] * before[i-2];
   }

   for (i = l; i > 1; i--) {
   	after[i-2] = nums[i-1] * after[i-1];
   }

   var arr = [];
   for (i=0; i<l; i++) {
   	arr[i] = before[i] * after[i];
   }
   return arr;
};

var a = [1, 2, 3, 4];
console.log(productExceptSelf(a));