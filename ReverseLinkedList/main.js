/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var prev = head;
    if (prev !== null) {
    	var cur = head.next;
    	while (cur !== null) {
    		prev.next = cur.next;
    		cur.next = head;
    		head = cur;
    		cur = prev.next;
    	}
    }

	return head;
};