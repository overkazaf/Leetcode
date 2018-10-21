/**
 * @param {number[]} nums
*/
var Solution = function(nums) {
  this.nums = nums;
};

/**
* Resets the array to its original configuration and return it.
* @return {number[]}
*/
Solution.prototype.reset = function() {
return this.nums;
};

/**
* Returns a random shuffling of the array.
* @return {number[]}
*/
Solution.prototype.shuffle = function() {
const result = [];
const arr = [...this.nums];
for (let i = this.nums.length - 1; i > 0; i--) {
  const rnd = Math.floor(Math.random() * i);
  const t = result[i];
  result[i] = arr[rnd];
  arr[rnd] = t;
}
return result;
};

/**
* Your Solution object will be instantiated and called as such:
* var obj = Object.create(Solution).createNew(nums)
* var param_1 = obj.reset()
* var param_2 = obj.shuffle()
*/
