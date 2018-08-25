/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {

	const keyboardRowMap = {
		q: 1, w: 1, e: 1, r: 1, t: 1, y: 1, u: 1, i: 1, o: 1, p: 1,
		a: 2, s: 2, d: 2, f: 2, g: 2, h: 2, j: 2, k: 2, l: 2,
		z: 3, x: 3, c: 3, v: 3, b: 3, n: 3, m: 3,
	};
    return words.filter(word => {
    	let pre;
    	const rowNoArray = word.split('').map(char => {
    		// 返回每个字母在键盘里的行数
    		return keyboardRowMap[char.toLowerCase()];
    	});
    	const res = rowNoArray.every(rowNo => {
    		if (pre === undefined) {
    			pre = rowNo;
    		}

    		return pre === rowNo;
    	});

    	return res;
    });
};


// 正则解法
var findWords = function(words) {
    return words.filter((w) => {
       return /^[qwertyuiop]*$/i.test(w) || /^[asdfghjkl]*$/i.test(w) || /^[zxcvbnm]*$/i.test(w);
    });
};