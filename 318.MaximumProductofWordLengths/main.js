/**
 * @param {string[]} words
 * @return {number}
 */
function hasNoCommonChar(wi, wj) {
  const arrWi = wi.split('');
  const arrWj = wj.split('');
  const dedupArrWi = Array.from(new Set(arrWi));
  const dedupArrWj = Array.from(new Set(arrWj));
  const flag1 = dedupArrWi.every(ch => {
      return !dedupArrWj.includes(ch);
  });
  if (!flag1) return false;
  const flag2 = dedupArrWj.every(ch => {
      return !dedupArrWi.includes(ch);
  });
  if (!flag2) return false;

  return true;
}

var maxProduct = function(words) {
    let max = 0;
    for (let i = 0; i < words.length; i++) {
      const validWords = [];
      let j = i + 1;
      while (j < words.length) {
        if (hasNoCommonChar(words[i], words[j])) {
          validWords.push(words[j]);
        }
        j++;
      }
      for (let j = i+1; j < words.length; j++) {
        if (hasNoCommonChar(words[i], words[j])) {
          max = Math.max(words[i].length * words[j].length, max);
        }
      }
    }
    return max;
};