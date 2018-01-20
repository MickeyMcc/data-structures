var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    if (list.tail === null) {
      list.setFirstNode(value);
    } else {
      list.tail.next = Node(value);
      list.tail = list.tail.next;
    }
  };

  list.addToHead = function(value) {
    if (list.head === null) {
      list.setFirstNode(value);
    } else {
      var oldHead = list.head;
      list.head = Node(value);
      list.head.next = oldHead;
    }
  };

  list.setFirstNode = function(value) {
    list.tail = Node(value);
    list.head = list.tail;
  };

  list.removeHead = function() {
    var oldHead = list.head;
    list.head = list.head.next;
    return oldHead.value;
  };

  list.contains = function(target) {
    var currentNode = list.head;
    do {
      if (target === currentNode.value) {
        return true;
      } else {
        currentNode = currentNode.next;
      }
    } while (currentNode !== null); // false when currentNode.previous was the tail
    return false; //all nodes have been checked
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 * .addToTail : O(1)
 * .addToHead : O(1)
 * .setFirstNode : O(1)
 * .removeHead : O(1)
 * .contains : O(n)
 * 
 */
