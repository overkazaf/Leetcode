/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    if (nums.length < 2) 
        return nums;
        
    var a = nums[0];
    var b, first = true;
    var cnt1 = 0, cnt2 = 0, l = nums.length;
    for (var i = 0; i < l; i++) {
        if (first && nums[i] !== a) {
            b = nums[i]; cnt2 = 1;first = false;
        } else {
            cnt1++;continue;
        }
        
        if (nums[i] === a || nums[i] === b) {
            if (nums[i] === a){
                cnt1++;cnt2--;
            }
            if (nums[i] === b){
                cnt2++;cnt1--;
            }
        } else {
            cnt1--;cnt2--;
            if(cnt1 < 0)cnt1 = 0;
            if(cnt2 < 0)cnt2 = 0;
            if(cnt1 === 0 && cnt2 === 0){
                first = true;
                a = nums[i];
            } else {
                if(cnt1 === 0){
                    a = b; cnt1 = cnt2;
                    cnt2 = 0;
                }
                if(cnt2 === 0){
                    b = nums[i]; cnt2 = 1;
                }
            }
        }
    }
    var res = [];
    cnt1 > 0 && res.push(a);
    cnt2 > 0 && res.push(b);
    return res;
};