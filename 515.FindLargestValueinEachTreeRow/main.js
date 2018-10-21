/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

function levelTraverse(root, arr) {
  let q = [];
  q.push(root);
  while (q.length) {
    let tmp = [];
    while (q.length) {
      const h = q.shift();
      if (h.left) {
          tmp.push(h.left);
      }
      if (h.right) {
          tmp.push(h.right);
      }
    }
    if (tmp.length) {
      arr.push(Math.max.apply(null, tmp));
      q = tmp;
    }
  }
}
var largestValues = function(root) {
    if (!root) {
        return [];
    } else {
      const results = [[root.val]];
      levelTraverse(root, results);
      return results
    }
};