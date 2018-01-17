var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = {'length': 0, 'storage': {}};
  
  _.extend(someInstance, stackMethods);
  return someInstance;
};

var stackMethods = {
  push: function (value) {
    this.length++;
    this.storage[this.length] = value;
  },

  pop: function() {
    var popped;
    if (this.length > 0) {
      popped = this.storage[this.length];
      this.length--;
    }
    return popped;  
  },

  size: function() {
    return this.length;
  }

};


