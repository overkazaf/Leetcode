package BSTIterator;

import java.awt.List;
import java.util.ArrayList;

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

public class BSTIterator {
	private TreeNode cursor = null;
	private ArrayList<TreeNode> tnList = null;
	public BSTIterator(TreeNode root) {
		tnList = new ArrayList<TreeNode>();
		buildIterator(root);
	}

	public TreeNode buildIterator(TreeNode root) {
		if (root != null) {
			
		}
	}
	/** @return whether we have a next smallest number */
	public boolean hasNext() {
		return cursor != null;
	}

	/** @return the next smallest number */
	public int next() {
		
	}
}

/**
 * Your BSTIterator will be called like this: BSTIterator i = new
 * BSTIterator(root); while (i.hasNext()) v[f()] = i.next();
 */
