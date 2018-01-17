var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = Object.create(queueMethods);
  instance.length = 0;
  instance.storage = {};
  return instance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.length++;
  this.storage[this.length] = value;
};

queueMethods.dequeue = function() {
  var next;
  if (this.length > 0) {
    next = this.storage[1];
    for (var i = 0; i <= this.length; i++) {
      this.storage[i] = this.storage[i + 1];
    }
    this.length--;
  }
  return next;
};

queueMethods.size = function() {
  return this.length;
};

