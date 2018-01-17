var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = {'length': 0, 'storage': {}};

  var extend = function(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj2[key];
    }
  }
  
  extend(someInstance, stackMethods);
  return someInstance;
};

var stackMethods = {
  push: function (value) {},

  pop: function() {},

  size: function() {
      return this.length;
    }

};


