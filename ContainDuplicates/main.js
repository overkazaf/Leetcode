var containsDuplicate = function(nums) {
    if (nums.length === 0) return false;
    var cache = {};
    nums.forEach(function (i, cont){
        if (i in cache) {
        	return true;
        }
        cache[i] = true; 
    });

    return false;
    
};

var a = [3,3];
containsDuplicate(a);
