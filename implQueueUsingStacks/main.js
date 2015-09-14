/**
 * @constructor
 */
var Queue = function() {
    this = [];
    this.stacks = [new Stack(), new Stack()];
};

var Stack = function (){
	this.data = [];
	this.top = -1;
	this.MAX_STACK_SIZE = 100;
};

Stack.prototype.push = function (x){
	this.data[++this.top] = x;
}

Stack.prototype.pop = function (){
	if (this.top >= 0) {
		return this.data[this.top--];
	}
}

Stack.prototype.getTop = function (){
	if (this.top >= 0) {
		return this.data[this.top];
	}
};

Stack.prototype.isEmpty = function (){
	return this.top >= 0;
}
Stack.prototype.isFull = function (){
	return this.top === this.MAX_STACK_SIZE;
}

Stack.prototype.empty = function (){
	this.data.length = 0;
	this.top = -1;
}
/**
 * @param {number} x
 * @returns {void}
 */
Queue.prototype.push = function(x) {
    var s1 = this.stacks[0],
    	s2 = this.stacks[1];
    this[this.length++] = x;
    
};

/**
 * @returns {void}
 */
Queue.prototype.pop = function() {
    
};

/**
 * @returns {number}
 */
Queue.prototype.peek = function() {
    
};

/**
 * @returns {boolean}
 */
Queue.prototype.empty = function() {
    
};