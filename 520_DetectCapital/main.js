/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
    var isUpperChar = (char) => { return char >= 'A' && char <= 'Z'; };
    var isLowerChar = (char) => { return char >= 'a' && char <= 'z'; };
    var wordArray = word.split('');
    var subWordArray = wordArray.slice(1);
    return isUpperChar(wordArray[0]) ? 
	    (subWordArray.every(isLowerChar) || subWordArray.every(isUpperChar))
		:
	    wordArray.every(isLowerChar);
};