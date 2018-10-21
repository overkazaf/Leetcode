/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
var constructFromPrePost = function(pre, post) {
  if (pre.length && post.length) {
    let root = new TreeNode(pre[0]);
    let i = 1;
    let j = 0;
    while (post[j] !== pre[i]) j++;
    const leftLimit = i + j + 1;
    root.left = constructFromPrePost(pre.slice(1, leftLimit), post.slice(0, j + 1));
    root.right = constructFromPrePost(pre.slice(leftLimit, pre.length), post.slice(j + 1, post.length - 1));
    return root;
  } else {
    return null;
  }
};