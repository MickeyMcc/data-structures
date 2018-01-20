

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
  this._storage.set(index, this.addToBucket(currentBucket, k, v));
  this._numberOfThings++;
};

HashTable.prototype.addToBucket = function(bucket, k, v) {
  if (Array.isArray(bucket)) { //bucket has been previously used
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === k) { //key already stored in hash table
        bucket[i][1] = v; //update to new value
      } else { //new key
        bucket.push([k, v]); //add value pair to bucket
      }
    }
  } else {
    bucket = [[k, v]]; //new bucket
  }
  return bucket;
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index); //bucket is arr of tuples
  return this.findInBucket(bucket, k);
};

HashTable.prototype.findInBucket = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return bucket[i][1];
    }
  }
};

HashTable.prototype.remove = function(k) {
  if ((this._numberOfThings - 1) / this._limit < 0.25) {
    this.changeSize(.5); 
  }
  var index = getIndexBelowMaxForKey(k, this._limit);
  var holderBucket = this._storage.get(index) || [];
  holderBucket = this.removeFromBucket(holderBucket, k);
  this._storage.set(index, holderBucket); //set storage to be new smaller bucket
  this._numberOfThings--;
};

HashTable.prototype.removeFromBucket = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) { //find key in bucketed tuples
      bucket.splice(i, 1); //take that tuple out of bucket
    }
  }
  return bucket;
};

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
  for (var i = 0; i < (this._limit); i++) {
    var oldBucket = this._storage.get(i);
    if (oldBucket) { // for unit of existing storage
      for (var j = 0; j < oldBucket.length; j++) { //for each tuple in the bucket there
        tempStorage.push(oldBucket[j]);
      }
    }
    this._storage.set(i, []); //clears storage in prep for adding everything back in
  }
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


