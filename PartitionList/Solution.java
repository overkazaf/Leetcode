package PartitionList;

import java.util.ArrayList;
import java.util.List;

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
	public ListNode partition(ListNode head, int x) {
		if (head == null)
			return head;
		List<Integer> iAList = new ArrayList<Integer>();
		List<Integer> iBList = new ArrayList<Integer>();
		ListNode p = head;
		while (p != null) {
			if (p.val < x) {
				iAList.add(p.val);
			} else {
				iBList.add(p.val);
			}
			p = p.next;
		}
		int startX = 0;
		if (iAList.size() != 0)
			head.val = iAList.get(0);
		else {
			head.val = iBList.get(0);
			startX = 1;
		}
		p = head;
		for (int i = 1, sizeA = iAList.size(); i < sizeA; i++) {
			p.next = new ListNode(iAList.get(i));
			p = p.next;
		}
		
		for (int i = startX, sizeB = iBList.size(); i < sizeB; i++) {
			p.next = new ListNode(iBList.get(i));
			p = p.next;
		}
		
		return head;
	}
}