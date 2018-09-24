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
var arr;
var minDiffInBST = function(root) {
  // todo
  
};

function dfs(node) {
  if (node) {
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
    arr.push(node.val);
  }
}