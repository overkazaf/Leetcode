/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    var xor = x ^ y;
    var counter = 0;
    while (xor !== 0) {
       xor &= (xor - 1);
       counter++;
    }

    return counter;
};
