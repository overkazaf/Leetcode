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
var oddEvenList = function(head) {
    if (head === null || head.next=== null) return head;

    var a = [], b = [],p = head, idx = 0;
    while (p !== null) {
    	if (idx ^ 1) {
    		a.push(p);
    	} else {
    		b.push(p);
    	}
    	idx ^= 1;
    	p = p.next;
    }

    idx = 0;
    while (idx < a.length) {
    	if(idx !== 0){
    		p.next = a[idx];	
    	}
    	p = a[idx++];
    }

    p = a[a.length-1];

    idx = 0;
    while (idx < b.length) {
    	p.next = b[idx];
    	p = b[idx++];
    }
    
    p.next = null;

    return head;
};