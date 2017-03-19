 // Definition for a binary tree node.
 function TreeNode(val) {
   this.val = val;
   this.left = this.right = null;
 }


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
      target[c++] = current.left ? current.left.val : null;

      if (current.right) {
        queue.push(current.right);
      }

      target[c++] = current.right ? current.right.val : null;
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
    var root = new TreeNode(nodes[0]);
    dfs(root, nodes, 0);

    return root;
  }

  return null;
 };

 function dfs(node, arr, index) {
  if (index > arr.length - 1) {
    return;
  }

  var lIndex = 2 * index + 1;
  var rIndex = 2 * index + 2;

  if (lIndex < arr.length) {
    node.left = new TreeNode(arr[lIndex]);
    dfs(node.left, arr, lIndex);
  }

  if (rIndex < arr.length) {
    node.right = new TreeNode(arr[rIndex]);
    dfs(node.right, arr, rIndex);
  }
 }

  console.dir(serialize(deserialize("[ 1, 2, 3, null, null, 4, 5, 6, 7 ]")));
  var c = deserialize("[ 1, 2, 3, null, null, 4, 5, 6, 7 ]");
  console.dir(c);


 /**
  * Your functions will be called as such:
  * deserialize(serialize(root));
  */