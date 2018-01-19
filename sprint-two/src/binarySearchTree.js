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
  debugger;
  var found = false;
  if (value === this.value) {
    found = true;
  }
  if (value > this.value) { 
    if (this.right !== null) {
      found = found || this.right.contains(value);  
    }  
  } else { 
    if (this.left !== null) {
      found = found || this.left.contains(value); 
    }
  }
  return found;
};

biTreeMethods.depthFirstLog = function(cb) {

};

/*
 * Complexity: What is the time complexity of the above functions?
 */
