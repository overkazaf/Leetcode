package CopyListwithRandomPointer;

/**
 * Definition for singly-linked list with a random pointer.
 * */
class RandomListNode {
	int label;
	RandomListNode next, random;

	RandomListNode(int x) {
		this.label = x;
	}
};

public class Solution {
	public RandomListNode copyRandomList(RandomListNode head) {
		RandomListNode node = new RandomListNode(-1);
		RandomListNode p = node;
		while (head != null) {
			p.next = new RandomListNode(head.label);
			p = p.next;
			p.next = head.next;
			p.random = head.random;
			head = head.next;
		}
		return node.next;
	}
}