/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    var ans = '',
    	bulls = 0, 
    	cows = 0;
    	
    for (var i=0, l=secret.length; i<l; i++) {
    	if (secret.charAt(i) === guess.charAt(i)) {
    		bulls++;
    	} else {
    		
    	}
    }

    var ret = bulls + 'A' + cows + 'B';
    return ret;
};