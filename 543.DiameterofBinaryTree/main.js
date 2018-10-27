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
function getDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(getDepth(node.left), getDepth(node.right));
}

function dfsGetDepth(root) {
  if (root) {
      let currentDepth = getDepth(root.left) + getDepth(root.right);
      if (currentDepth > max) max = currentDepth;
      dfsGetDepth(root.left);
      dfsGetDepth(root.right);
  }
}

let max = 0;
var diameterOfBinaryTree = function(root) {
  if (!root) return 0;
  max = 0;
  dfsGetDepth(root);
  return max;
};