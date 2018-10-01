function findLeftLeaveVal(node = null, parent) {
  if (!node) {
    return 0;
  } else {
    if (!node.left && !node.right) {
      if (parent && parent.right !== node) {
        return node.val;
      } else {
        return 0;
      }
    } else {
      return findLeftLeaveVal(node.left, node) + findLeftLeaveVal(node.right, node);
    }
  }
}
var sumOfLeftLeaves = function(root) {
  return findLeftLeaveVal(root, null);
};

function Node(val) {
  this.val = val;
  this.left = this.right = null;
}

function test() {
  const node1 = new Node(3);
  const node2 = new Node(9);
  const node3 = new Node(20);
  const node4 = new Node(15);
  const node5 = new Node(17);

  node1.left = node2;
  node1.right = node3;
  node3.left = node4;
  node3.right = node5;

  console.log(sumOfLeftLeaves(node1));  
}

test();