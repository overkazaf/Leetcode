/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    var cache = {};
    if(s === t)return true;

    for (var i=0,l=s.length; i<l; i++) {
        var ch1 = s.charAt(i),
            ch2 = t.charAt(i);
        if (! (ch1 in cache)) {
            for (var attr in cache) {
                if(ch2 === cache[attr]) return false;
            }
            cache[ch1] = ch2;
        } else {
            if (cache[ch1] !== ch2) {
                return false;
            }
        }
    }

    return true;
};

var a = 'ab';
var b = 'aa';
console.log(isIsomorphic(a, b));