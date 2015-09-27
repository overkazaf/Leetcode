var permuteUnique = function(nums) {
    var l = nums.length;
    var cache = [];
    var results = [];
    var permute = function (n, arr, cur){
      if (cur === n) {
        var b = buildArrByIndex(nums, arr);
        var key = b.join(',');
        if (cache.indexOf(key) === -1) {
          cache.push(key);
          results.push(b);
        }
      } else {
        for (var i = 1; i <= n; i++) {
          if(arr.indexOf(i) !== -1) continue;
          
          arr[cur] = i;
          permute(n, arr, cur + 1);
        }
      }
    };
    permute(l, [], 0);
    return results;
};

var buildArrByIndex = function (arr, indexArr) {
  var tar = [];
  for (var i=0; i<indexArr.length; i++) {
    tar[i] = arr[indexArr[i]-1];
  }
  return tar;
}
var log = function (k){
  console && console.log(k);
};

var arr = [1, 1, 3];
console.log(permuteUnique(arr));