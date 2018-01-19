

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
  var holderBucket = this._storage.get(index);
  for (var i = 0; i < holderBucket.length; i++) {
    if (holderBucket[i][0] === k) { //find key in bucketed tuples
      holderBucket.splice(i, 1); //take that tuple out of bucket
    }
  }
  this._storage.set(index, holderBucket); //set storage to be new smaller bucket
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


