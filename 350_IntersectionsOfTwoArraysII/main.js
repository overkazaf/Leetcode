/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    // const dedup1 = Array.from(new Set(nums1));
    // const dedup2 = Array.from(new Set(nums2));
    
    return nums1.filter(item => {
        if (nums2.includes(item)) {
            nums2.splice(nums2.indexOf(item), 1);
            return true;
        }
        return false;
    });
};