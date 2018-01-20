var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {}; // fix me
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  this._storage[JSON.stringify(item)] = item;
};

setPrototype.contains = function(item) {
  return !!this._storage[JSON.stringify(item)];
};

setPrototype.remove = function(item) {
  delete this._storage[JSON.stringify(item)];
};

setPrototype.getRandom = function() {
  var elements = Object.keys(this._storage);
  var randomNumber = Math.floor(Math.random() * elements.length); 
  return this._storage[elements[randomNumber]];
};

/*  
 * Complexity: What is the time complexity of the above functions?
 * .add: O(1)
 * .contains: O(1)
 * .remove: O(1)
 * .getRandom: O(1)
 */
