/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
	let target = String(s).split('');
    let vowels = {
    	a: 1,
    	e: 1,
    	i: 1,
    	o: 1,
    	u: 1,
        A: 1,
        E: 1,
        I: 1,
        o: 1,
        u: 1
    };

    for (var i = 0, l = target.length, j = l-1; i < j; i++) {
    	if (vowels[target[i]] === 1) {
    		while (vowels[target[j]] !== 1 && i < j) {
                j--;
            }

            if (i < j) {
                var t = target[i];
                    target[i] = target[j];
                    target[j] = t;
                j--;
            }
    	}
    }

    return target.join('');
};
