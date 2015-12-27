/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    var cand = [],
    	cursor = conins.length-1;
    while (cursor > 0) {
    	if (conis[cursor] <= amount) {
    		cand.push(coins[cursor]);
    		amount -= coins[cursor];
    	} else {
    		cursor--;
    	}
    }

    return cand.length === 0 ? -1 cand.length;
};