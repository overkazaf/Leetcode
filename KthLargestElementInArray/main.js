Array.prototype.buildMaxHeap = function () {
	for (var i = Math.floor(this.length / 2); i >= 0; i--) {
		this.adjustHeap(i, this.length);
	}
	//console.log(this);
};


Array.prototype.swap = function (i, j){
	//console.log('SWAPPING---->' + i + ":" + j);
	var tmp = this[i];
	this[i] = this[j];
	this[j] = tmp;
};

Array.prototype.adjustHeap = function (i, j){
	var largest = i,
		left = 2*i,
		right = 2*i + 1;
    if(i >= j)return;
	
	if (left < j && this[largest] < this[left]) {
		largest = left;
	}

	if (right < j && this[largest] < this[right]) {
		largest = right;
	}

	if (largest != i) {
		this.swap(largest, i);
		this.adjustHeap(largest, j);
	}
};

Array.prototype.heapSort = function (){
	this.buildMaxHeap();
	for (var i = this.length-1; i >= 0; i--) {
		this.swap(0, i);
		this.adjustHeap(0, i);
	}
	return this;
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    return nums.heapSort()[nums.length-k];
};







