class Stack {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  constructor() {
    this.length = 0;
    this.storage = {};
  }

  push(value) {
    this.length++;
    this.storage[this.length] = value;
  }
  
  pop() {
    var popped;
    if (this.length > 0) {
      popped = this.storage[this.length];
      this.length--;
    }
    return popped;
  }

  size() {
    return this.length;
  }

}