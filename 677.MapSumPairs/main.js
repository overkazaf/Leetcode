/**
 * Initialize your data structure here.
 */
var MapSum = function() {
  this.map = {};
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
  this.map[key] = val;
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    return Object.keys(this.map).filter(key => {
      return key.startsWith(prefix);
    }).map(key => {
      return this.map[key];
    }).reduce((prev, curr) => {
      return prev + curr;
    }, 0);
};

/** 
 * Your MapSum object will be instantiated and called as such:
 * var obj = Object.create(MapSum).createNew()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */