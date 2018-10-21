/**
 * @param {string} S
 * @param {number[]} shifts
 * @return {string}
 */
var shiftingLetters = function(S, shifts) {
  const alphabetStr = "abcdefghijklmnopqrstuvwxyz";
  const alphabets = alphabetStr.split("");
  const alphabetMap = {};
  alphabets.forEach((ch, index) => {
    alphabetMap[ch] = index;
  });
  const resultArray = S.split('');
  const modedShifts = shifts.map(times => times % 26);
  const sumShifts = [];
  let sum = modedShifts.reduce((prev, curr) => {
      return prev + curr;
  }, 0) % 26;
  for (let i = 0; i < modedShifts.length; i++) {
    sumShifts[i] = modedShifts[i];
    sum -= modedShifts[i];
    sumShifts[i] += sum;
    sumShifts[i] %= 26;
    if (sumShifts[i] < 0) sumShifts[i] += 26;

    resultArray[i] = alphabets[(alphabetMap[resultArray[i]] + sumShifts[i]) % 26];
  }

  return resultArray.join("");
};
