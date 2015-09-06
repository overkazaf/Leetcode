var maxProduct = function(nums) {
   var
      mx = [nums[0]], mi = [nums[0]], max = nums[0];
      for (var i=1;i<nums.length;i++) {
         mx[i] = getMax(nums[i], nums[i]*mx[i-1], nums[i]*mi[i-1]);
         mi[i] = getMin(nums[i], nums[i]*mx[i-1], nums[i]*mi[i-1]);
         if (max < mx[i]) max = mx[i];
      }
   return max;
};

function getMax(a, b, c){return Math.max(Math.max(a, b), c);}
function getMin(a, b, c){return Math.min(Math.min(a, b), c);}

var a = [-4, -3, -2];
console.log(maxProduct(a));