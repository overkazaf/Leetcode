/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
Number.prototype.toBinary = function () {
	var str = this.toString(2);
	while (str.length < 32) {
		str = '0' + str;
	}
	return str;
}
var reverseBits = function(n) {
    return (n.toBinary().split('').reverse().join('').toString(10));
};

console.log(reverseBits(4294967295));