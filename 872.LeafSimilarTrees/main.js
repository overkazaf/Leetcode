/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
function findLeaves(root, arr) {
  if (root) {
    if (!root.left && !root.right) arr.push(root);
    else {
      findLeaves(root.left, arr);
      findLeaves(root.right, arr);
    }
  }
}
function isTheSameValueArray(vals1, vals2) {
  return vals1.every((item, index) => {
    return item === vals2[index];
  });
}
var leafSimilar = function(root1, root2) {
  const res1 = [];
  const res2 = [];
  findLeaves(root1, res1);
  findLeaves(root2, res2);
  return isTheSameValueArray(res1.map(n => n.val), res2.map(n => n.val));
};
