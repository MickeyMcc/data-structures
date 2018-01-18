var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // starts with no children, is end of branch
  
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  //each child is itself a tree
  this.children.push(Tree(value));
  //creates a new tree with the given value 
  //to the tree it was called on
};

treeMethods.contains = function(target) {
  var found = false;
  if (this.value === target) {  //this node is the one
    return true;
  }
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].contains(target)) {  //if that child tree had target we are done
      return true;
    }
  } // otherwise continue through childre
  return false; //after all nodes have been checked
};



/*
 * Complexity: What is the time complexity of the above functions?
addChild: O(1)
treeMethods: O(n)
 */
