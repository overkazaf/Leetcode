/**
 * @param {string} input
 * @return {number[]}
 */
var res;
var diffWaysToCompute = function(input) {
  if (input === '') {
  	return [];
  }
  res = [];
  return helper(input, 0, input.length-1);
};


var helper = function (input, s, e){
	try {
		if (!isNaN(input.substring(s, e+1))){
			var n = parseInt(input.substring(s, e+1)); 
			res.push(n);
			return res;
		}
		
	} catch(e){}

	for (var i = s; i <= e; i++) {
		var o = input.charAt(i);
		if (o === '+' || o === '-' || o === '*') {
			var left = helper(input, s, i - 1);
			var right = helper(input, i + 1, e);

			for (var j = 0; j < left.length; j++) {
				for (var k = 0; k < right.length; k++) {
					var newVal;
					if (o === '+') {
						newVal = left[j] + right[k];
					} else if (o === '-') {
						newVal = left[j] - right[k];
					} else {
						newVal = parseInt(left[j] * right[k]);
					}

					res.push(newVal);
				}
			}
		}
	}

	return res;
};