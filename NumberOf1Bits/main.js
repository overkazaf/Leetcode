/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    var cnt = 0,
    	f = 0;
    while (n) {
    	f++;
    	if(n&1)cnt++;
    	if (f==1){
    		n = Math.floor(n/2);
    	} else {
    		n >>= 1;
    	}
    }
    return cnt;
};

