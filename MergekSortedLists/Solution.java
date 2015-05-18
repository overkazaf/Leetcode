package MergekSortedLists;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;


class ListNode {
	int val;
	ListNode next;

	ListNode(int x) {
		val = x;
		next = null;
	}
}

public class Solution {
    public ListNode mergeKLists(List<ListNode> lists) {
    	if (lists == null || lists.size() == 0) return null;
    	List<ListNode> list = new ArrayList<ListNode>();
    	Queue<ListNode> queue = new LinkedList<ListNode>();
    	while (true) {
    		if (lists.size() == 0)break;
    		for (ListNode node : lists) {
    			if (node != null) {
    				queue.add(node);
    				if (queue.size() == 2) {
    					list.add(merge(queue.poll(), queue.poll()));
    				}
    			}
    		}
    	}
    }
    
    public ListNode merge(ListNode a, ListNode b) {
    	if (a == null || b == null)
    		return a == null ? b : a;
    	
    	ListNode head = new ListNode(-1);
    	ListNode tail = head;
    	
    	for (; a != null && b != null;) {
    		if (a.val < b.val) {
    			tail.next = a;
        		a = a.next;
    		} else {
    			tail.next = b;
        		b = b.next;
    		}
    		tail = tail.next;
    	}
    	
    	return head.next;
    }
}