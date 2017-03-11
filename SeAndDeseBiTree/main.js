/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
   var t = levelTraverse(root);
   console.log('t', t);
   return '[' + t.reduce(function(prev, cur) {
   	return prev + ',' + cur;
   }, '').substring(1) + ']';
};

function levelTraverse(root) {
  var level = getTreeLevel(root);
  var q = [];
  var result = [];
  var i = 0;
  var last = parseInt(Math.pow(2, level), 10);

  if (root !== null) {
  	q.push(root);
  	i++;
  	while (i < 2 * last - 1) {
  		var node = q.shift();
  		if (i < last) {
  			result.push(node.val);
  		}

  		if (node.left === null) {
			node.left = new TreeNode(null);
  		}
  		q.push(node.left);
  		i++;

  		if (node.right === null) {
			node.right = new TreeNode(null);
  		}
  		q.push(node.right);
  		i++;
  	}
  }

  return result;
}


function getTreeLevel(root) {
  if (root) {
  	return 1 + Math.max(getTreeLevel(root.left), getTreeLevel(root.right));
  } else {
  	return 0;
  }
}


/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var getLastSeq = function(ta) {
	var lastSeq = 1;
	var l = ta.length;
	while (lastSeq < l) {
		lastSeq <<= 1;
	}
	return lastSeq;
}
var deserialize = function(data) {
    var ta = JSON.parse(data);
    if (!ta.length) return null;

    var root = new TreeNode(null);
    var last = getLastSeq(ta);
    var queue = [null];
    var cur;

    queue.push(root);
    root.val = ta[0];

    for (var i = 1; i <= parseInt(last / 2, 10); i++) {
    	var j = i;
    	var l = 2 * j - 1;
    	var r = 2 * j;

    	cur = queue[i];

    	if (l < last) {
    		var val = ta[l] === null ? null : ta[l];
    		cur.left = new TreeNode(val);
    		queue.push(cur.left);
    	}

    	if (r < last) {
    		var val = ta[r] === null ? null : ta[r];
    		cur.right = new TreeNode(val);
    		queue.push(cur.right);
    	}
    }

    return root;
};

var r = (function() {
	var node = new TreeNode(1);
	var r = new TreeNode(2);
	node.right = r;
	r.left = new TreeNode(3);
	r.right = new TreeNode(4);
	return node;
})();


console.log('serialize(r)', serialize(r));
console.log('serialize(r)', serialize(r));
console.log('serialize(r)', serialize(r));

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */