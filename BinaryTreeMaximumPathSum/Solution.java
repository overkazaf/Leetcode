package BinaryTreeMaximumPathSum;

/**
 * Definition for binary tree
 **/
class TreeNode {
	int val;
	TreeNode left;
	TreeNode right;
	TreeNode(int x) {
		val = x;
	}
}

public class Solution {
	private int sum,max;
	public int maxPathSum(TreeNode root) {
		if (root == null)
			return 0;
		max = sum = 0;
		maxSum(root.left);
		int lmax = max;
		max = sum = 0;
		maxSum(root.right);
		int rmax = max;
		return root.val + lmax + rmax;
	}
	public void maxSum (TreeNode r) {
		if (r == null) {
			return;
		} else {
			sum += r.val;
			boolean flag = false;
			if (sum < 0)
			{
				sum = 0;
				flag = true;
			}
			
			if (r.left == null && r.right == null) {
				if (sum > max)
					max = sum;
			} else {
				maxSum(r.left);
				maxSum(r.right);
			}
			
			if (!flag)
				sum -= r.val;
		}
	} 
}