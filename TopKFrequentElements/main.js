/**
 * @param {number[]} nums
 *  * @param {number} k
 *   * @return {number[]}
 *    */
var topKFrequent = function(nums, k) {
   var map = {};
   for (var i = 0, n; n = nums[i++];) {
     if(!map[i]) map[i] = 0;
     map[i]++;
   }
   var kvMapArray = [];
   for (var attr in map) {
     var kvMap = {};
     kvMap['key'] = attr;
     kvMap['value'] = map[attr];
     kvMapArray.push(kvMap);
   }

   kvMapArray = kvMapArray.sort(function (a, b) {
    return b.value - a.value;
   });

   var result = [];

   for (var j = 0; j < k; j++) {
    result.push(kvMapArray[j]['key']);
   }

   return result;
}
