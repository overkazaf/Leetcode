/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

var us = {};
var lowestCommonAncestor = function(root, p, q) {
    if (root) {
    	us = {};
    	us[root.val] = null;
    	initUSet(root);
    	return findLCA(root, p, q);
    } 
    return root;
};

function findLCA (r, a, b) {
	
}

function initUSet (r) {
	if (r) {
		if (r.left) us[r.left.val] = r;
		if (r.right) us[r.right.val] = r;
		initUSet(r.left);
		initUSet(r.right);
	}
}










