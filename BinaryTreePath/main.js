/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
function TreeNode(val) {
   this.val = val;
   this.left = this.right = null;
}
var queue = [],
	path = [];
var binaryTreePaths = function(root) {
    path.length = 0;
    queue.length = 0;
    dfs(root);
    return path;
};

function cleanUp () {
	for (var i = path.length-1; i >= 0 ; i--) {
		if (path.indexOf('->') == -1) {
			path.slice(i, 1);
		}
	}
}

function dfs (r) {
	if (r != null) {
		queue.push(r.val);
		if (r.left != null || r.right != null) {
			r.left && dfs(r.left);
			r.right && dfs(r.right);
		} else {
			path.push(queue.join('->'));
		}
		queue.length = queue.length - 1;
	}
}

var a = new TreeNode(1);
var b = new TreeNode(2);
var c = new TreeNode(3);
var e = new TreeNode(5);


a.left  = b;
a.right = c;
// b.right = e;
// a.right = c;



binaryTreePaths(a);
console.log(path);






