var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var anInstance = {'size': 0, 'storage': {}};

  var extend = function(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj2[key];
    }
  };

  extend(anInstance, queueMethods);

  return anInstance;
};

var queueMethods = {
  enqueue: function() {},

  dequeue: function() {},

  size: function() {}
};


