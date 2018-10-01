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
function bfs(node, set) {
  if (node) {
    set.add(node.val);

    bfs(node.left, set);
    bfs(node.right, set);
  }
}
var findSecondMinimumValue = function(root) {
    const set = new Set();
    bfs(root, set);
    const dedupArray = Array.from(set);
    return dedupArray.length < 2 ? -1 : dedupArray.sort()[1];
};