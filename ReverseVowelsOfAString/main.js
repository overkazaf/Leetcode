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
    	u: 1
    };

    var arr = [];
    for (var i = 0, l = target.length; i < l; i++) {
    	if (vowels[target[i].toLowerCase()] === 1) {
    		arr.push(i);
    	}
    }

    var i = 0, j = arr.length - 1;
    while (i < j) {
    	var a = arr[i];
    	var b = arr[j];
    	
    	var t = target[a];
    		target[a] = target[b];
    		target[b] = t;

    	i++;j--;
    }
    return target.join('');
};
