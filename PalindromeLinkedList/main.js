/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

var isPalindrome = function(head) {
    var p = head,
    	q = head.next,
    	l = 0,
    	cnt = 0;

    	while (p && p.next) {
    		p = p.next;
    		q = q.next.next;
    		l++;
    	}

    	q = p.next;
    	while (q && q.next) {
    		var t = q.next;
    		q.next = t.next;
    		p.next = t;
    		t.next = q;
    	}
    	var l = head,
    		r = p.next;
    	while (l != p) {
    		if (l.val != r.val) {
    			return false;
    		}
    		l = l.next;
    		r = r.next;
    	}

    	return true;
};