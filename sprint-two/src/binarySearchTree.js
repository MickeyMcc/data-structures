var BinarySearchTree = function(value) {
  var newBiTree = {};
  newBiTree.value = value;

  newBiTree.left = null;
  newBiTree.right = null;
  newBiTree.parent = null;

  newBiTree.numOnLeft = 0;
  newBiTree.numOnRight = 0;

  _.extend(newBiTree, biTreeMethods);
  return newBiTree;
};

var biTreeMethods = {};

biTreeMethods.insert = function(value) {
  if (this.contains(value)) {
    return;//if tree already has the value to add, quit
  }
  if (value > this.value) { //check if value to be added is greater than val at node
    this.numOnRight++;
    this.right = this.addToBranch(this.right, value);
  } else { // else (to be added less than current node)see if left leaf is taken
    this.numOnLeft++;
    this.left = this.addToBranch(this.left, value);
  }
  this.checkRebalance();
};

biTreeMethods.addToBranch = function(branch, value) {
  if (branch === null) { 
    branch = BinarySearchTree(value);
    branch.parent = this;
  } else {
    branch.insert(value); //recurse down tree
  }
  return branch;
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

biTreeMethods.checkRebalance = function() {
  this.depthFirstLog(function(node) {
    if ( this.numOnRight + 1 < this.numOnLeft ) {
      this.rebalanceTree('left');
    } else if ( this.numOnRight > this.numOnLeft + 1 ) {
      this.rebalanceTree('right');
    }
  });
};

biTreeMethods.rebalanceTree = function(heavySide) {
  if (heavySide === 'right') {
    var lightSide = 'left';
  } else {
    lightSide = 'right';
  }
  var oldTop = this;
  var newTop = this[heavySide];
  newTop[lightSide] = oldTop;
  newTop[heavySide] = oldTop[lightSide];
  newTop.parent = oldTop.parent;
  oldTop.parent = newTop;

  return newTop;
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

biTreeMethods.breadthFirstLog = function(cb) {
  this.breadthFirstLogHelper([this], cb);
};

biTreeMethods.breadthFirstLogHelper = function(currentLevel, cb) {
  var nextLevel = [];
  for (var i = 0; i < currentLevel.length; i++) {
    cb(currentLevel[i].value);
    if (currentLevel[i].left !== null) {
      nextLevel.push(currentLevel[i].left);
    }
    if (currentLevel[i].right !== null) {
      nextLevel.push(currentLevel[i].right);
    }
  }
  if (nextLevel.length !== 0) {
    this.breadthFirstLogHelper(nextLevel, cb);
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
