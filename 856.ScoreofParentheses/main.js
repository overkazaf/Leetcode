/**
 * @param {string} S
 * @return {number}
 */
function calcScore(S) {
  if (!S) return 0;
  else {
    const l = S.length;
    if (l === 2) {
      if (S.charAt(0) === '(' && S.charAt(1) === ')') {
        return 1;
      }
    } else {
      if (S.charAt(0) === '(' && S.charAt(1) === ')') {
        return 1 + calcScore(S.substring(2));
      } else if (S.charAt(0) === '(' && S.charAt(1) === '(' && S.charAt(l-2) === ')' && S.charAt(l-1) === ')') {
        const findAIndex = (s) => {
          const st = [];
          let i = 0;
          st.push(s.charAt(i));
          while (st.length) {
            i++;
            if (s.charAt(i) === '(') {
              st.push('(');
            } else if (s.charAt(i) === ')') {
              st.pop();
            }
          }
          return i + 1;
        };
        const aIndex = findAIndex(S.substring(1));
        const A = S.substring(1, aIndex);
        const B = S.substring(aIndex+1, l-1);
        return 2 * (calcScore(A) + calcScore(B))
      }
    }
  }
}

var scoreOfParentheses = function(S) {
    return calcScore(S);
};