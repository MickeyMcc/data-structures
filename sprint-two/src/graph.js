

// Instantiate a new graph
var Graph = function(value) {
  this.value = value;
  this.edges = [];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  var newNode = new Graph(node);
  this.edges.push(newNode);
  newNode.edges.push(this);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node, array) {
  var alreadyVisited = array || [];
  if (this.value === node) {
    return true;
  } else {
    alreadyVisited.push(this);
    for (var i = 0; i < this.edges.length; i++) {
      if (!alreadyVisited.includes(this.edges[i])) {
        if (this.edges[i].contains(node, alreadyVisited)) {
          return true;
        }
      }
    }
    return false;
  }
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


