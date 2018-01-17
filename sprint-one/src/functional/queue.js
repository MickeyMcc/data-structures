var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  // Implement the methods below

  someInstance.enqueue = function(value) {
    size++;
    storage[size] = value;
  };

  someInstance.dequeue = function() {
    var dequeue;
    if (size > 0) {
      dequeue = storage[1];
      for (i = 1; i <= size; i++) {
        storage[i] = storage[i + 1];
      }
      storage[size] = undefined;
      size--;
    }
    return dequeue;
  };

  someInstance.size = function() {
    return size;
  };

  return someInstance;
};
