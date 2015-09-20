/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
	var queue = [],
		res   = [];

	var cur = 0,
		last = 1;
	queue.push(root);
	if (queue.length) {
		last = queue.length;
		while (cur < last) {
			var node = queue[cur];
			if (node.left) {
				queue.push(node.left);
			}

			if (node.right) {
				queue.push(node.right);
			}
			cur++;
		}
		res.push(queue[last-1].val);
	}
	return res;
};
