var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;

  // Implement the methods below
  someInstance.push = function(value) {
    storage.size = value;
    size++;
  };

  someInstance.pop = function() {
    var popped;
    if (size > 0) {
      popped = storage.size;
      storage.size = undefined;
      size--;
    }
    return popped;
  };

  someInstance.size = function() {
    return size;
  };

  return someInstance;
};
