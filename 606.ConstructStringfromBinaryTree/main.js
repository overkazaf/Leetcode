/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
var tree2str = function(t) {
  if (!t) return "";
  else if (!t.right) {
    if (!t.left) {
      return `${t.val}`;
    } else {
      return `${t.val}(${tree2str(t.left)})`;
    }
  } else {
    return `${t.val}(${tree2str(t.left)})(${tree2str(t.right)})`;
  }
};
