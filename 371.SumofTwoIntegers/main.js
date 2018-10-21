/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
  let carry = (a & b) << 1; // 如果有进位，下一位的carry值置为1
  let sum = (a ^ b);
  while (carry !== 0) {
    const tmpCarry = carry;
    // 相当于依次尝试，将有进位的进行对比，每一次左移一位，最多共进位31次
    // 这里的carry表示着下一位是否有进位，有则对应位的值为1(进位只存在于carry和sum的对应位都是1的情况下)
    carry = (sum & carry) << 1;
    // 将前一步的进位标志carry与sum做运算，得出最新结果
    sum = (sum ^ tmpCarry);
  } 
  return sum;
};