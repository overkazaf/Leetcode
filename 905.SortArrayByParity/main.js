/**
 * @param {number[]} A
 * @return {number[]}
 */
function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
var sortArrayByParity = function(A) {
  let l = 0;
  let r = A.length - 1;
  while (l < r) {
    if (A[l] % 2 === 0) l++;
    else swap(A, l, r);
      
    if (A[r] % 2 === 1) r--;
    else swap(A, l, r);
  }
  return A;
};