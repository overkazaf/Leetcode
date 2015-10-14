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

	var maxLeft = dfs(root.left);
	var maxRight = dfs(root.right);
	return root.val + maxLeft + maxRight;
};

var dfs = function(node) {
	if (node === null) return 0;
	else {
		var l = dfs(node.left);
		var r = dfs(node.right);
		return node.val + Math.max(l, r);
	}
};