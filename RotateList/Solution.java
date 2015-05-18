package RotateList;

import java.util.ArrayList;
import java.util.List;

/**
 * Definition for singly-linked list.
 * */
class ListNode {
	int val;
	ListNode next;

	ListNode(int x) {
		val = x;
		next = null;
	}
}

public class Solution {
	public ListNode rotateRight(ListNode head, int n) {
		if (head == null)
			return head;
		List<Integer> iList = new ArrayList<Integer>();
		ListNode p = head;
		while (p != null) {
			iList.add(p.val);
			p = p.next;
		}
		int size = iList.size();
		if ( n > size) 
			n %= size;
		int start = size - n;
		rotate(iList, 0, start -1);
		rotate(iList, start, size - 1);
		rotate(iList, 0, size - 1);
		p = head;
		for (Integer item : iList) {
			p.val = item;
			p = p.next;
		}

		return head;
	}

	public void rotate(List<Integer> iList, int b, int e) {
		if (b <= e) {
			for (int i = b, j = e; i < j; i++, j--) {
				Integer temp = iList.get(i);
				iList.set(i, iList.get(j));
				iList.set(j, temp);
			}
		}
	}

//	public static void main(String[] args) {
//		Solution s = new Solution();
//		ListNode head = new ListNode(1);
//		ListNode p = head;
//		for (int i = 2; i < 6; i++) {
//			p.next = new ListNode(i);
//			p = p.next;
//		}
//		ListNode q = s.rotateRight(head, 2);
//		while (q != null) {
//			System.out.print(q.val + "->");
//			q = q.next;
//		}
//		System.out.println("");
//	}
}
