/**
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
var uncommonFromSentences = function(A, B) {
	const resultMap = {};
	[A, B].forEach(str => {
		str.split(' ').forEach(word => {
			if (!(word in resultMap)) {
				resultMap[word] = 0;
			}
			resultMap[word]++;
		});
	});

	return Object.keys(resultMap).filter(word => {
		return resultMap[word] === 1;
	});
};