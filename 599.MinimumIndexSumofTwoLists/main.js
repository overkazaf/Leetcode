/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function(list1, list2) {
  let map = new Map();
  list1.forEach((item, index) => {
      map.set(item, index);
  });
  let res = [];
  let minSumIndex;
  list2.forEach((item, index) => {
      if (typeof map.get(item) !== 'undefined') {
          // list1里 与 list2里 相同餐厅值的序号比上一次记录的下标和的值小时，对下标和进行更新
          // 如果下标和一样的，继续往里添加
          let idx = map.get(item);
          if (typeof minSumIndex === 'undefined') {
              minSumIndex = idx + index;
              res = [ item ];
          } else {
              if (minSumIndex > idx + index) {
                  minSumIndex = idx + index;
                  res = [ item ];
              } else if (minSumIndex === idx + index) {
                  res.push(item);
              }
          }
      } else {
          map.set(item, index);
      }
  });
  return Array.from(new Set(res));
};