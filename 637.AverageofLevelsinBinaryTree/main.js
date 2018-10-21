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
  arr.push([root]);
  while (q.length) {
   let tmp = [];
   while (q.length) {
     const head = q.shift();
     if (head.left) tmp.push(head.left);
     if (head.right) tmp.push(head.right);
   }
   if (tmp.length) {
     arr.push([...tmp]);
     // q指向下一层的所有节点
     q = tmp;
   }
  }
}

var averageOfLevels = function(root) {
   const results = [];
   levelTraverse(root, results);
   return results.map(res => {
     const vals = res.map(n => n.val);
     return vals.reduce((prev, curr, index) => {
       if (index !== vals.length - 1) {
         return prev + curr;
       } else {
         // 最后一位求和并算出平均值
         return (prev + curr) / vals.length;
       }
     }, 0);
   });
};