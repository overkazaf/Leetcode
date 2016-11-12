/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
	console.log('top3(nums)', top3(nums));
    return top3(nums)[0];
};

function top3(nums) {
	return topN(3, nums);
}

function topN(N, nums) {
	var heap = [];
	for (var i = 0, l = nums.length; i < l; i++) {
		var c = nums[i];
		if (heap.length < N) {
			heap.push(c);
		}

		if (heap == N) {
			heap = heapAdjust(heap, 0, N);
			heap = buildMinHeap(heap, N);
		}

		if (heap.length == N && c > heap[0]) {
			console.log('not sort', heap);
			heap[0] = c;
			heap = heapAdjust(heap, 0, N);
			heap = buildMinHeap(heap, N);
			console.log('sort', heap);
		}
	}

	console.log('top['+N+']', heap);
	return heap;

}

function buildMinHeap(h, N) {
	for (var i = Math.floor(N/2); i>=0; i-- ) {
		h = heapAdjust(h, i, N);
	}
	return h;
}

function heapAdjust(h, s, e) {
	var t = h[s];
	console.log('ttt', t);
	for (var i = 2*s+1; i < e; i *= 2) {
		if (i<e && h[i] > h[i+1] && i+1 < e) {
			// 挑选小的一个
			++i;
		}

		if (t < h[i]) {
			break;
		}

		h[s] = h[i]; // 根变为最小的元素
		s = i;
	}

	h[s] = t;

	return h;
}

console.log(thirdMax([1,2,3]));