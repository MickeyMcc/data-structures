class Queue {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  constructor() {
    this.length = 0;
    this.storage = {};
  }

  enqueue(value) {
    this.length++;
    this.storage[this.length] = value;
  }
  
  dequeue() {
    var next;
    if (this.length > 0) {
      next = this.storage[1];
      for (var i = 1; i <= this.length; i++) {
        this.storage[i] = this.storage[i + 1];
      }
      this.length--;
    }
    return next;
  }

  size() {
    return this.length;
  }
}
