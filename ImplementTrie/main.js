var ALPHABET_SIZE = 26;
/**
 * @constructor
 * Initialize your data structure here.
 */
var TrieNode = function() {
    this.count = 0;
    this.children = [];
    for (var i = 0; i < ALPHABET_SIZE; i++) {
        this.children[i] = null;
    }
};

var char2Index = function(ch) {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(ch);
};

var Trie = function() {
    this.root = TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 * Inserts a word into the trie.
 */
Trie.prototype.insert = function(word) {
    var p = this.root;
    while (word.length) {
    	if (p.children[char2Index(word[0])] == null) {
    		p.children[char2Index(word[0])] = TrieNode();
    	}
    	p = p.children[char2Index(word[0])];

    	word = word.substring(1);
    }
    p.count++;
};

/**
 * @param {string} word
 * @return {boolean}
 * Returns if the word is in the trie.
 */
Trie.prototype.search = function(word) {
	var p = this.root;
	while (word.length && p) {
		p = p.children[char2Index(word[0])];
		word = word.substring(1);
	}

	if (p == null) {
		return false;
	} else {
		return p.count > 0;
	}
};

/**
 * @param {string} prefix
 * @return {boolean}
 * Returns if there is any word in the trie
 * that starts with the given prefix.
 */
Trie.prototype.startsWith = function(prefix) {
	var p = this.root;
	while (prefix.length && p) {
		p = p.children[char2Index(prefix[0])];
		prefix = prefix.substring(1);
	}

	return p != null;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var trie = new Trie();
 * trie.insert("somestring");
 * trie.search("key");
 */
