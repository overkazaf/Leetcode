var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var idx = function (ch){
	return alphabet.indexOf(ch);
};
var hash = function (word) {
	var 
		i = 0,
		n = word.length,
		tot = 0;

	for (;i<n; i++) {
		tot += (1<<i) * (idx(word.charAt(i)));
	}

	return tot;
};

var MAX_NODE_SIZE = 1005;
var SIGMA_SIZE = alphabet.length;

/**
 * @constructor
 * Initialize your data structure here.
 */
var TrieNode = function() {
    this.ch = [];
    this.sz = 1;
    this.val = [];
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
    var 
    	c = -1;
    	u = 0,
    	n = word.length;
    for (var i = 0; i < n; i++) {
		c = idx(word.charAt(i));
    	if (!this.ch[u][c]) {
    		this.ch[this.sz] = [];
    		this.val[this.sz] = 0; // 中间结点
    		this.ch[u][c] = this.sz++;
    	}
    	u = this.ch[u][c];
    }
    this.val[u] = hash(word);
};

/**
 * @param {string} word
 * @return {boolean}
 * Returns if the word is in the trie.
 */
Trie.prototype.search = function(word) {
    var 
    	c = -1,
    	u = 0,
    	n = word.length;
    for (var i = 0; i < n; i++) {
    	c = idx(word.charAt(i));
    	if (!this.ch[u][c]) {
    		u++;
    		if (u === this.sz)break;
    	}
    }

    return i === n;
};

/**
 * @param {string} prefix
 * @return {boolean}
 * Returns if there is any word in the trie
 * that starts with the given prefix.
 */
Trie.prototype.startsWith = function(prefix) {
    
    var 
    	c = -1,
    	u = 0,
    	n = word.length;
    for (var i = 0; i < n; i++) {
    	c = idx(word.charAt(i));
    	if (!this.ch[u][c]) {
    		break;
    	}
    }

    if (i === n) return true;
    else {

    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * var trie = new Trie();
 * trie.insert("somestring");
 * trie.search("key");
 */