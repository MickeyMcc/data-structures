var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;

  // your code here
  newTree.children = []; // starts with no children, is end of branch
  
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  //each child is itself a tree
  var newChild = Tree(value); //creates a new tree with the given value 
  newChild.parent = this; //the parent is what ever node the function was called on
  this.children.push(newChild); //as a child of the tree it was called on
};

treeMethods.contains = function(target) {
  var found = false;
  if (this.value === target) { //this node is the one
    return true;
  }
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].contains(target)) { //if that child tree had target we are done
      return true;
    }
  } // otherwise continue through childre
  return false; //after all nodes have been checked
};

treeMethods.removeChild = function(value) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].value === value) { //splices val to remove out of child list
      this.children.splice(i, 1);
      return;
    }
    if (this.children[i] !== []) { //recurses down tree
      this.children[i].removeChild(value);
    }
  }  
};

treeMethods.removeFromParent = function() {
  for (var i = 0; i < this.parent.children.length; i++) {
    if (this.parent.children[i] === this) {
      this.parent.children.splice(i, 1);
    }
  }
  this.parent = null;
  return this;
};

treeMethods.traverse = function(cb) {
  if (this.value) {
    cb(this.value);
  }
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].traverse(cb);
  } 
};

/*
 * Complexity: What is the time complexity of the above functions?
 * .addChild: O(1)
 * .contains: O(n)
 * .remove: O(n)
 */
