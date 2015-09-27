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
var countNodes = function(root) {
    var seq = 1;
    var cur = 0;
    var last = 1;
    var queue = [];
    var seqArr = [];
    if (root !== null) {
    	queue.push(root);
    	seqArr.push(seq);
    	while (cur < last) {
    		last = queue.size();
    		while (cur < last) {
    			var node = queue.shift();
    			if (node.left !== null) {
    				queue.push(node.left);
    				seqArr.push(seq+1);
    			} else {
    				seqArr.push(-1);
    			}
    			seq++;

    			if (node.right !== null) {
    				queue.push(node.right);
    				seqArr.push(seq+1);
    			} else {
    				seqArr.push(-1);
    			}
    			seq++;
    			cur++;
    		}
    	}
    	for (var i = 0; i < seqArr.length; i++) {
    		if (seqArr[i] === -1) {
    			break;
    		}
    	}
    	return i;

    } else{
    	return 0;
    }
};