/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {
  if (s && t) {
    const q1 = [];
    const q2 = [];
    // level traverse to compare if t is a subtree of s
    q1.push(s);
    q2.push(t);
    let flag = true;
    while (flag && q1.length) {
      const h1 = q1.shift();
      const h2 = q2.shift();
      if (h1.val !== h2.val) {
        flag = false;
      } else {
        if (h1.left) q1.push(h1.left);
        if (h2.left) q2.push(h2.left);
        if (q1.length !== q2.length) {
          flag = false;
          break;
        }
        
        if (h1.right) q1.push(h1.right);
        if (h2.right) q2.push(h2.right);
        if (q1.length !== q2.length) {
          flag = false;
          break;
        }
      }
    }
    return flag || isSubtree(s.left, t) || isSubtree(s.right, t);
  } else {
    return !s && !t;
  }
};