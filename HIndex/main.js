/**
 * @param {number[]} citations
 * @return {number}
 */
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    var l = citations.length;
    var h = l;
    if (l) {
    	citations.sort(function(a, b){return a - b;});
    	for (var i = 0; i < l; i++) {
    		if (citations[i] >= h) {
    			return h;
    		} else {
    			h--;
    		}
    	}
    }
    return h;
};

var a = [3, 0, 6, 1, 5];
console.log(hIndex(a));