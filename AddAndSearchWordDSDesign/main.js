var ALPHABET_SIZE = 26;

function TreeNode() {
    this.count = 0;
    this.children = [];
    for (var i = 0; i < ALPHABET_SIZE; i++) {
        this.children[i] = null;
    }
}

var char2Index = function(ch) {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(ch);
};

/**
 * @constructor
 */
var WordDictionary = function() {
    this.root = new TreeNode();
};

/**
 * @param {string} word
 * @return {void}
 * Adds a word into the data structure.
 */
WordDictionary.prototype.addWord = function(word) {
    var p = this.root;
    while (word.length && p !== null) {
        if (p.children[char2Index(word[0])] === null) {
            p.children[char2Index(word[0])] = new TreeNode();
        }
        p = p.children[char2Index(word[0])];
        word = word.substring(1);
    }

    if (p !== null) {
        p.count++;
    }
};

/**
 * @param {string} word
 * @return {boolean}
 * Returns if the word is in the data structure. A word could
 * contain the dot character '.' to represent any one letter.
 */
WordDictionary.prototype.search = function(word) {
    return this.searchExt(this.root, word);
};


WordDictionary.prototype.searchExt = function(root, word) {
	var p = root;
	if (word.length && p !== null) {
		if (word[0] === '.') {
			for (var i = 0; i < ALPHABET_SIZE; i++) {
				if (p.children[i] !== null && this.searchExt(p.children[i], word.substring(1))) {
					return true;
				}
			}
			return false;
		} else {
			return this.searchExt(p.children[char2Index(word[0])], word.substring(1));
		}
	} else {
		return p === null ? false : p.count > 0;
	}
}


/**
 * Your WordDictionary object will be instantiated and called as such:
 * var wordDictionary = new WordDictionary();
 * wordDictionary.addWord("word");
 * wordDictionary.search("pattern");
 */

var dict = new WordDictionary();
dict.addWord('abc');
dict.addWord("bad")
dict.addWord("dad")
dict.addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true

console.log(dict.search('pad'));
console.log(dict.search('bad'));
console.log(dict.search('.ad'));
console.log(dict.search('b..'));
