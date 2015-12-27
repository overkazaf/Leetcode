var ALPHABET_SIZE = 26;

function TreeNode (ch) {
	this.ch = ch;
	this.count = 0;
	this.children = [];
	for (var i = 0; i < ALPHABET_SIZE; i++) {
		this.children[i] = null;
	}
}

var char2Index = function (ch) {
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	return alphabet.indexOf(ch);
}

var createNode = function (ch) {
	var node = new TreeNode(ch);
	return node;
}

var insert = function (node, word) {
	if (word.length == 0) {
		node.count += 1;
		return;
	}

	var ch = word[0],
		p;

	if (node) {
		if (null == node.children[char2Index(ch)]) {
			node.children[char2Index(ch)] = createNode(ch);
		}
		p = node.children[char2Index(ch)];

		insert(p, word.substring(1));
	}
}

var search = function (root, word) {
	var node = root;
	while (word.length && node) {
		node = node.children[char2Index(word[0])];
		word = word.substring(1);
	}
	if (node == null) {
		return 0;
	} else {
		return node.count;
	}
};

var startsWith = function(root, prefix) {
	while (prefix.length && root) {
		root = root.children[char2Index(prefix[0])]
		prefix = prefix.substring(1);
	}
	return root != null;
};


var main = function () {
	var root = createNode('#');
	var words = ["the", "a", "there", "answer", "any", "by", "bye", "their","their","their","their"];
	for (var i = 0, l = words.length; i < l; i++) {
		insert(root, words[i]);
	}
	console.log(search(root, 'their'));
	
};

main();