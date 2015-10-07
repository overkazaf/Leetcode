/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    var n1,
        n2,
        c1      = 0,
        c2      = 0,
        i       = 0,
        t1      = 0,
        t2      = 0,
        l       = nums.length,
        edge    = Math.floor(l/3),
        res     = [];

    for (; i < l; i++) {
        if(c1 === 0){n1 = nums[i]; ++c1; continue;}
        if(c2 === 0){n2 = nums[i]; ++c2; continue;}
        if(c1 !== 0 && n1 === nums[i]) {++c1; continue;}
        if(c2 !== 0 && n2 === nums[i]) {++c2; continue;}
        --c1;--c2;
    }

    for (i = 0; i < l; i++) {
        if(c1 > 0) {if(n1 === nums[i]) ++t1;}
        if(c2 > 0) {if(n2 === nums[i]) ++t2;}
    }

    if(t1 > edge) res.push(n1);
    if(t2 > edge) res.push(n2);


    return res;
};