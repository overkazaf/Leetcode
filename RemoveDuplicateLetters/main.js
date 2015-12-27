/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
	var i, 
		c, 
		l = s.length, 
		lastChar,
		map = {}, 
		visited = {};

	res = ['0'];

	for (i = 0; i < l; i++) {
		c = s[i];
		visited[c] = false;
		
		if (! (c in map)) {
			map[c] = 0; 
		}
		
		map[c]++;
	}

	for (i = 0; i < l; i++) {
		c = s[i];
		map[c]--;
		if (visited[c]) continue;
        lastChar = res[res.length-1];
		
        // 如果只有一次的，直接跳过while， push进去。
        // 如果有多次的， 检查当前字符的字典序是否小于当前的最后一个字符，如果小于，则重置位置
		while (c < lastChar && map[lastChar]) {
			visited[lastChar] = false;
            res.pop();
		}

		res.push(c);
		visited[c] = true;
	}

	return res.join('').substring(1);

};
