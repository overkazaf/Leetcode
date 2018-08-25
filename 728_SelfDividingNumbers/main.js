/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function(left, right) {
  var result = [];
  for (var i = left; i <= right; i++) {
  	if (i < 10) {
  		result.push(i);
  		continue;
  	}
  	if (isSelfDrivingNumberV2(i)) {
  		result.push(i);
  	}
  }
  return result;
};

function isSelfDrivingNumber(n) {
    if (n < 10) {
        return true;
    }
    
	var checkArray = ('' + n).split('').map(function(str) {
        return parseInt(str, 10);
    });
	return checkArray.filter(function(digit) {
		return n % digit === 0;
	}).length === checkArray.length;
}

function isSelfDrivingNumberV2(n) {
	var nStr = '' + n;
	for (var i = 0; i < nStr.length; i++) {
		if (n % nStr[i] !== 0) {
			return false;
		}
	}
	return true;
}