/**
 * @param {number} N
 * @return {number}
 */
var binaryGap = function(N) {
  let str = Number(N).toString(2);
  let dis = 0;
  let prev, next;
  for (let i = 0; i < str.length; i++) {
      if (Number.parseInt(str[i], 10) === 1) {
          if (typeof next === 'undefined') {
              next = i;
              prev = i;
          } else {
              prev = next;
              next = i;
          }
          dis = Math.max(dis, next - prev);
      }
  }
  return dis;
};