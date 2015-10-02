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
var lowestCommonAncestor = function(root, p, q) {
    if (root === null || p === root || q === root) {
    	return root;
    }

    var l = lowestCommonAncestor(root.left, p, q);
    var r = lowestCommonAncestor(root.right, p, q);

    if (l === null){
    	return r;
    }

    if (r === null) {
    	return root;
    }

    return root;
};