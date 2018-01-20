

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._numberOfThings = 0;
};

HashTable.prototype.insert = function(k, v, shifting) {
  if ((this._numberOfThings + 1) / this._limit >= 0.75) {
    this.increaseSize(); 
  }
  var index = getIndexBelowMaxForKey(k, this._limit);
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
  this._numberOfThings++;
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
  if ((this._numberOfThings - 1) / this._limit < 0.25) {
    this.decreaseSize(); 
  }
  var index = getIndexBelowMaxForKey(k, this._limit);
  var holderBucket = this._storage.get(index) || [];
  for (var i = 0; i < holderBucket.length; i++) {
    if (holderBucket[i][0] === k) { //find key in bucketed tuples
      holderBucket.splice(i, 1); //take that tuple out of bucket
    }
  }
  this._storage.set(index, holderBucket); //set storage to be new smaller bucket
  this._numberOfThings--;
};

HashTable.prototype.findKeyFor = function(v) {
  for (var i = 0; i < this._limit; i++) {
    var bucket = this._storage.get(i);
    if (Array.isArray(bucket)) {
      for (var j = 0; j < bucket.length; j++) {
        if (bucket[j][1] === v) {
          return bucket[j][0];
        }
      }
    }
  }
  return 'value not found';
};

HashTable.prototype.pullEverything = function() {
  var tempStorage = [];
  for (var i = 0; i < (this._limit); i++) {
    var oldBucket = this._storage.get(i);
    if (oldBucket) {// for unit of existing storage
      for (var j = 0; j < oldBucket.length; j++) {//for each tuple in the bucket there
        tempStorage.push(oldBucket[j]);
      }
    }
    this._storage.set(i, []);
  }
  return tempStorage;
}

HashTable.prototype.increaseSize = function() {
  var existingData = this.pullEverything();
  this._limit *= 2;
  this._storage = LimitedArray(this._limit);
  this._numberOfThings = 0;
  for (var j = 0; j < existingData.length; j++) {
    var key = existingData[j][0];
    var value = existingData[j][1];
    this.insert(key, value, true);
  }
};

HashTable.prototype.decreaseSize = function() {
  var existingData = this.pullEverything();
  this._limit /= 2;
  this._storage = LimitedArray(this._limit);
  this._numberOfThings = 0;
  for (var j = 0; j < existingData.length; j++) {
    var key = existingData[j][0];
    var value = existingData[j][1];
    this.insert(key, value, true);
  }
};
/*
 * Complexity: What is the time complexity of the above functions?
 */


