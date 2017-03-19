/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  var queue = [];
  var target = [];
  var p = root;
  var c = 0;
  if(p !== null) {
    queue.push(p);
    target[c++] = p.val;
    while (queue.length) {
      var current = queue.shift();

      if (current.left) {
        queue.push(current.left);
      }
      target[c++] = current.left !== null ? current.left.val : null;

      if (current.right) {
        queue.push(current.right);
      }

      target[c++] = current.right !== null ? current.right.val : null;
    }
   
    while (target[--c] === null && c >= 0) {
      target.pop();
    }
  }
  return JSON.stringify(target);
 };

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  var nodes = JSON.parse(data);
  if (nodes.length) {
    var root = new TreeNode(nodes.shift());
    var queue = [];
    queue.push(root);
    while (queue.length && nodes.length) {
        var node = queue.shift();
        var l = nodes.shift();
        if (l !== null) {
            node.left = new TreeNode(l);
            queue.push(node.left);
        }
        if (!nodes.length) break;
        var r = nodes.shift();
        if (r !== null) {
            node.right = new TreeNode(r);
            queue.push(node.right);
        }
    }
    
    return root;
  }
  
  return null;
 };
 

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */