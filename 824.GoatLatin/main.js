/**
 * @param {string} S
 * @return {string}
 */
var toGoatLatin = function(S) {
  function repeat(ch, times) {
      let s = '';
      let cnt = 0;
      while(cnt++ < times) s += ch;
      return s;
  }
  let times = 2;
  return S.split(' ').map(word => {
      let rest = word.substring(1);
      let firstChar = word.charAt(0);
      const vowelMap = {
        a: 1, e: 1, i: 1, o: 1, u: 1,
      };
      if (firstChar.toLowerCase() in vowelMap) {
        firstChar = '';
        rest = word;
      }
      return `${rest}${firstChar}m${repeat('a', times++)}`
  }).join(' ');
};

function test() {
  console.log(toGoatLatin('I speak Goat Latin'));
}

test();