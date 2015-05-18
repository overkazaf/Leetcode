package PopulatingNextRightPointersinEachNode;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Definition for binary tree with next pointer.
 * */
class TreeLinkNode {
	int val;
	TreeLinkNode left, right, next;

	TreeLinkNode(int x) {
		val = x;
	}
}

public class Solution {
	private List<TreeLinkNode> qList;
	public void connect(TreeLinkNode root) {
		if(root == null)
			return;
		qList = new ArrayList<TreeLinkNode>();
		int cur = 0;
		int last = 1;
		TreeLinkNode p = root;
		qList.add(p);
		while (cur != last) {
			TreeLinkNode q = qList.get(cur);
			cur++;
			if(cur == last){
				while (!qList.isEmpty()) {
					TreeLinkNode t = qList.remove(0);
					if (t == q){
						t.next = null;
						break;
					} else {
						t.next = qList.get(0);
					}
				}
			}
			
			if(q.left != null)
			{
				qList.add(q.left);
				last++;
			}
			if(q.right != null)
			{
				qList.add(q.right);
				last++;
			}
		}
	}
}