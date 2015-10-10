/**
 * Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
set(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
 */
/**
 * @constructor
 */
var LRUCache = function(capacity) {
    this.cache = {};
    this.queue = [];
    this.capacity = capacity;
};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function(key) {
    if (key in this.cache) {
    	for (var i = this.queue.length - 1; i >= 0; i--) {
    		if (key === this.queue[i]){
    			this.queue.splice(i, 1);
    			break;
    		}
    	}
    	this.queue.unshift(key);
    	return this.cache[key];
    }

    return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {
    if (key in this.cache) {
    	for (var i = this.queue.length - 1; i >= 0; i--) {
    		if (this.queue[i] === key) {
    			Array.prototype.splice.call(this.queue, i, 1);
    			break;
    		}
    	}
    }
    
    while (this.queue.length >= this.capacity) {
    	var k = this.queue.pop();
    	delete this.cache[k];
    }
    this.queue.unshift(key);
    this.cache[key] = value;
};
//2,[set(2,1),set(1,1),get(2),set(4,1),get(1),get(2)]


var LRU = new LRUCache(2);
//2,[set(2,1),set(1,1),get(2),set(4,1),get(1),get(2)]

LRU.set(2, 1);
LRU.set(1,1);
LRU.get(2);
LRU.set(4,1);
var b = LRU.get(1);
console.log(b);
LRU.get(2);







