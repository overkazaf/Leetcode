/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
	if (root === null) {
	  return 0;
	}

	var l = dfs(root.left);
	var r = dfs(root.right);

	if (l >= 0 && r >= 0) {
	    return root.val + l + r;
	} else {
	    return Math.max(node.val, Math.max(node.val+l, node.val+r));
	}
};


var dfs = function(node) {
	if (node === null) return 0;
	else {
        if (node.left === null && node.right === null) {
		    // leaf node just return it's value
			return node.val;
		}

		var l = dfs(node.left);
		var r = dfs(node.right);
		return Math.max(l, r);
	}
};
