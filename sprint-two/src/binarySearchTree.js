var BinarySearchTree = function(value) {
  var newBiTree = {};
  newBiTree.value = value;
  newBiTree.left = null;
  newBiTree.right = null;

  _.extend(newBiTree, biTreeMethods);
  return newBiTree;
};

var biTreeMethods = {};

biTreeMethods.insert = function(value) {
  if (value === this.value) {
    return;//if val at node equals val to be added, quit
  }
  if (value > this.value) { //check if value to be added is greater than val at node
    if (this.right === null) { // if yes see if right leaf if taken
      this.right = BinarySearchTree(value); // if no assign value to right leaf
    } else {
      this.right.insert(value);// else call .insert on right leaf with value
    }
  } else { // else (to be added less than current node)see if left leaf is taken
    if (this.left === null) { 
      this.left = BinarySearchTree(value); // if no assign value to left leaf
    } else {
      this.left.insert(value); // else call .insert on left leaf with value
    }  
  }
};


biTreeMethods.contains = function(value) {
  var found = false;
  if (value === this.value) {
    found = true;
  }
  if (this.right && (value > this.value)) {
    found = found || this.right.contains(value);   
  } else if (this.left && (value < this.value)) { 
    found = found || this.left.contains(value); 
  }
  return found;
};

biTreeMethods.depthFirstLog = function(cb) {
  cb(this.value);
  if (this.left) {
    this.left.depthFirstLog(cb);
  }
  if (this.right) {
    this.right.depthFirstLog(cb);
  }
};

biTreeMethods.closest = function(value, closestValue = 0) {
  if (Math.abs(this.value - value) < Math.abs(closestValue - value)) { //doesn't replace on ties
    closestValue = this.value;
  }
  if (this.left && (value < this.value)) {
    closestValue = this.left.closest(value, closestValue);
  }
  if (this.right && (value > this.value)) {
    closestValue = this.right.closest(value, closestValue);
  }
  return closestValue; //if two numbers on tree are equidistant, will always return the smaller
};

/*
 * Complexity: What is the time complexity of the above functions?
* .insert O(logN)
* .contains O(logN)
* .depthFirstLog O(n)
* .closest O(logN)
 */
