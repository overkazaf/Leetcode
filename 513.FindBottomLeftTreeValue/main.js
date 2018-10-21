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
function levelTraverse(root, arr, leftNodeFlags) {
  let q = [];
  q.push(root);
  let level = 1;
  while (q.length) {
    let tmp = [];
    while (q.length) {
      const node = q.shift();

      if (node.left) {
        tmp.push(node.left);
        if (!leftNodeFlags[level]) {
          leftNodeFlags[level] = node.left;
        }
        // mark as true
      }
      if (node.right) {
        if (!leftNodeFlags[level]) {
          leftNodeFlags[level] = node.right;
        }
        tmp.push(node.right);
      }
    }
    level++;
    arr.push([...tmp]);
    q = tmp;
  }
} 
var findBottomLeftValue = function(root) {
    const leftNodeFlags = [null];
    levelTraverse(root, [], leftNodeFlags);
    return leftNodeFlags[leftNodeFlags.length - 1].val;
};