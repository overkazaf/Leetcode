/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function(root) {
    if (!root) return null;
    root.left = increasingBST(root.left);
    root.right = increasingBST(root.right);

    if (root.left) {
      const p = root.left;
      const q = root.left;
      while (q.right) {
        q = q.right;
      }
      q.right = root;
      root.left = null;
      return p;
    }
    return root;
};