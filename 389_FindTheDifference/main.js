/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    const resultMap = {};
    s.split('').forEach(item => {
        resultMap[item] = (resultMap[item] || 0) + 1;
    });

    t.split('').forEach(item => {
        if (!(item in resultMap)) {
            resultMap[item] = 100;
        }
        
        resultMap[item]--;
    });

    const [result] = Object.keys(resultMap).filter(key => {
      // 有可能会重复，如s="a", t="aa"，所以不能用>0判断
      return resultMap[key] !== 0;
    });
    
    return result;
};