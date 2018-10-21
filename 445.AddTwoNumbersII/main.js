/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function reverseList(list) {

}
var addTwoNumbers = function(l1, l2) {
    const q1 = [];
    const q2 = [];
    let p = l1;
    while (p) {
      q1.push(p);
      p = p.next;
    }

    p = l2;
    while (p) {
      q2.push(p);
      p = p.next;
    }
    let carry = 0;
    while (q1.length || q2.length) {
      if (q1.length && q2.length) {
        const h1 = q1.pop();
        const h2 = q2.pop();
        h1.val += h2.val + carry;
        if (h1.val > 9) {
          carry = 1;
          h1.val %= 10;
        } else {
          carry = 0;
        }
      } else {
        const q = q1.length ? q1 : q2;
        while (q.length) {
          p = q.pop();
          p.val += carry;
          if (p.val > 9) {
            carry = 1;
            p.val %= 10;
          } else {
            carry = 0;
          }
        }
        if (carry) {
          p.val += carry;
          if (p.val > 9) {
            
            p.val %= 10;
            const newNode = new ListNode(carry);
            newNode.next = p;
            return newNode;
          }
        }
      }
    }
    return p;
};