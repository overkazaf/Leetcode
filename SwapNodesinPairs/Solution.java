package SwapNodesinPairs;

/**
 * Definition for singly-linked list.
 **/
class ListNode {
	int val;
	ListNode next;

	ListNode(int x) {
		val = x;
		next = null;
	}
}

public class Solution {
	public ListNode swapPairs(ListNode head) {
		if (head == null || head.next == null)
			return head;
		ListNode p = head;
		ListNode h = head.next;
		p.next = h.next;
		h.next = p;
		p.next = swapPairs(p.next);
		return h;
	}
}