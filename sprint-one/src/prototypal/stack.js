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

};

stackMethods.pop = function() {
};

stackMethods.size = function() {
  return this.length;
};
