/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function(k) {
    this.queue = [];
    this.front = this.rear = -1;
    this.size = k;
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
  if (!this.isFull()) {
    this.queue.push(value);
    this.front++;
    if (this.rear === -1) {
      this.rear++;
    }
    return true;
  } else {
    return false;
  }
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
  if (!this.isFull()) {
    this.queue.unshift(value);
    this.front++;
    if (this.rear === -1) {
      this.rear++;
    }
    return true;
  } else {
    return false;
  }
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
    if (!this.isEmpty()) {
      this.queue.pop();
      this.front--;
      if (this.isEmpty()) {
        this.rear--;
      }
      return true;
    } else {
      return false;
    }
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
  if (!this.isEmpty()) {
    this.queue.shift();
    this.front--;
    if (this.isEmpty()) {
      this.rear--;
    }
    return true;
  } else {
    return false;
  }
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
  if (this.front !== -1) {
    return this.queue[this.front];
  } else {
    return -1;
  }
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
  if (this.rear !== -1) {
    return this.queue[this.rear];
  } else {
    return -1;
  }
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
    return this.queue.length === 0;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
  return this.queue.length === this.size;
};

/** 
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = Object.create(MyCircularDeque).createNew(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */