var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = Object.create(stackMethods);
  instance.length = 0;
  instance.storage = {};
  return instance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.length++;
  this.storage[this.length] = value;
};  

stackMethods.pop = function() {
  var popped;
  if (this.length > 0) {
    popped = this.storage[this.length];
    this.length--;
  }
  return popped;
};

stackMethods.size = function() {
  return this.length;
};
