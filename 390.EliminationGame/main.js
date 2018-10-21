/**
 * @param {number} n
 * @return {number}
 */
var lastRemaining = function(n) {
  let head = 1;
  let remaining = n
  let step = 1;
  let leftToRight = true;
  while (remaining > 1) {
      if (leftToRight || remaining % 2 == 1) {
          head += step;
      }
      step *= 2;
      remaining /= 2;
      remaining = ~~remaining;
      leftToRight = !leftToRight;
  }
  return head;
};
