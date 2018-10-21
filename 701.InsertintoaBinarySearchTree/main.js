/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    if (root) {
      let n = root;
      while (n) {
        if (val > n.val) {
          if (n.right) {
            n = n.right;
          } else {
            n.right = new TreeNode(val);
            break;
          }
        } else if (val < n.val) {
          if (n.left) {
            n = n.left;
          } else {
            n.left = new TreeNode(val);
            break;
          }
        } else {
          return root;
        }
      }
    }

    return root;
};