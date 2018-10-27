/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function(s) {
  const recordMap = {
      A: 0,
      L: 0,
      P: 0,
  };
  const list = s.split('');
  let result = true;
  let l = list.length;
  list.forEach((ch, index) => {
      if (!result) return;
      recordMap[ch]++;
      if (ch === 'A') {
          if (recordMap.A > 1) result = false;
      } else if (ch === 'L') {
        let cnt = 1;
        let j = index + 1;
        while(j < l && list[j++] === 'L') cnt++;
        if (cnt > 2) result = false;
      }
  });
    
  return result;
};