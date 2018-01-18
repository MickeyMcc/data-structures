

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  console.log(index);
  var currentBucket = this._storage.get(index);
  if (Array.isArray(currentBucket)) {
    //need to check for already used key
    for (var i = 0; i < currentBucket.length; i++) {
      if (currentBucket[i][0] === k) {
        currentBucket[i][1] = v;
      } else {
        currentBucket.push([k, v]);
      }
    }
    this._storage.set(index, currentBucket);
  } else {
    this._storage.set(index, [[k, v]]);
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);  //bucket is arr of tuples
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return bucket[i][1];
    }
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, undefined);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


