var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.length = 0;
};

Queue.prototype.enqueue = function(value) {
  this.length++;
  this.storage[this.length] = value;
};

Queue.prototype.dequeue = function() {
  var next;
  if (this.length > 0) {
    next = this.storage[1];
    for (var i = 1; i <= this.length; i++) {
      this.storage[i] = this.storage[i + 1];
    }
    this.length--;
  }
  return next;
};

Queue.prototype.size = function() {
  return this.length;
};
