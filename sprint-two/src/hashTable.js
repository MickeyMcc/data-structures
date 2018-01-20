

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._numberOfThings = 0;
};

HashTable.prototype.insert = function(k, v, shifting) {
  if ((this._numberOfThings + 1) / this._limit >= 0.75) {
    this.changeSize(2); 
  }

  var index = getIndexBelowMaxForKey(k, this._limit);
  var currentBucket = this._storage.get(index);
  
  if (!currentBucket) {
    currentBucket = [];
    this._storage.set(index, currentBucket);
  } 

  var found = false;

  for (var i = 0; i < currentBucket.length; i++) {
    var tuple = currentBucket[i];
    if (tuple[0] === k) {
      tuple[1] = v;
    }
  }
  
  if (!found) {
    currentBucket.push([k, v]);
    this._numberOfThings++;
  }
};


HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index); //bucket is arr of tuples
  if (!bucket) {
    return null;
  } 

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      return tuple[1];
    }
  }
  
  return null;
};

HashTable.prototype.remove = function(k) {
  if ((this._numberOfThings - 1) / this._limit < 0.25) {
    this.changeSize(.5); 
  }

  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index); //bucket is arr of tuples

  if (!bucket) {
    return null;
  } 
  
  //iterate through bucket
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      bucket.splice(i, 1);
      this._numberOfThings--;
      return tuple[1];
    }
  }
  
  return null;
};

// HashTable.prototype.removeFromBucket = function(bucket, k) {
//   for (var i = 0; i < bucket.length; i++) {
//     if (bucket[i][0] === k) { //find key in bucketed tuples
//       bucket.splice(i, 1); //take that tuple out of bucket
//     }
//   }
//   return bucket;
// };

HashTable.prototype.findKeyFor = function(v) {
  for (var i = 0; i < this._limit; i++) {
    var bucket = this._storage.get(i);
    var key = this.findKeyInBucket(bucket, v); //if value was not in this bucket, undefined
    if (key !== undefined) {
      return key;
    }
  }
  return 'value not found';
};

HashTable.prototype.findKeyInBucket = function(bucket, v) {
  if (Array.isArray(bucket)) {
    for (var j = 0; j < bucket.length; j++) {
      if (bucket[j][1] === v) {
        return bucket[j][0]; //if the value was in the bucket returns corresponding key
      }
    }
  } //otherwise returns undefined
};

HashTable.prototype.pullEverything = function() {
  var tempStorage = [];
  this._storage.each(function (bucket) {
    if (bucket) { // for unit of existing storage
      for (var j = 0; j < bucket.length; j++) { //for each tuple in the bucket there
        tempStorage.push(bucket[j]);
      }
    }
    bucket = []; //clears storage in prep for adding everything back in
  }.bind(this));
  return tempStorage;
};

HashTable.prototype.changeSize = function(factor) {
  var existingData = this.pullEverything();
  this._limit *= factor;
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
 * .retrieve (no resize) O(1)
 * .remove (no resize) O(1)
 * .retrieve O(1)
 * .changeSize (n)
 * .pullEverything (n)
 * .findKeyFor (n)
 */


