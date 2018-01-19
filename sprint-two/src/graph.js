

// Instantiate a new graph
var Graph = function(value) {
  this.nodes = [];
  this.edges = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
  this.edges[node] = [];
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodes.includes(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  var nodeIndex = this.nodes.indexOf(node);
  this.nodes.splice(nodeIndex, 1);
  for (var i = 0; i < this.edges[node].length; i++) { 
    this.removeEdge(node, this.edges[node][i]);
  }
  this.edges[node] = [];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.edges[fromNode].includes(toNode);
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.edges[fromNode].push(toNode);
  this.edges[toNode].push(fromNode);

};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  var nodeIndex = this.edges[fromNode].indexOf(toNode);
  this.edges[fromNode].splice(nodeIndex, 1);
  nodeIndex = this.edges[toNode].indexOf(fromNode);
  this.edges[toNode].splice(nodeIndex, 1);
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var i = 0; i < this.nodes.length; i++) {
    cb(this.nodes[i]);
  }
};

// Returns the node with the most edges
Graph.prototype.findMostEdges = function() {
  var mostEdges = this.nodes[0];
  for (var i = 0; i < this.nodes.length; i++) {
    if (this.edges[this.nodes[i]].length > this.edges[mostEdges].length) {   
      mostEdges = this.nodes[i];
    }
  }
  return mostEdges;
};

/*
 * Complexity: What is the time complexity of the above functions?
 * .addNode: O(1)
 * .contains: O(n)
 * .removeNode: O(n)
 * .hasEdge: O(n)
 * .addEdge: O(1)
 * .removeEdge: O(n)
 * .forEachNode: O(n)
 * .findMostEdges: O(n)
 */