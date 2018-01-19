var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    if (list.tail === null) {
      list.tail = Node(value);
      list.head = list.tail;
    } else {
      list.tail.next = Node(value);
      list.tail.next.previous = list.tail;
      list.tail = list.tail.next;
    }
  };

  list.addToHead = function(value) {
    if (list.head === null) {
      list.head = Node(value);
      list.tail = list.head;
    } else {
      var oldHead = list.head;
      list.head = Node(value);
      oldHead.previous = list.head;
      list.head.next = oldHead;
    }
  };

  list.removeTail = function() {
    var oldTailVal = list.tail.value;
    if (list.tail.previous) {
      list.tail = list.tail.previous;
      list.tail.next = null;
    } else {
      list.head = null;
      list.tail = null;
    }
    return oldTailVal
  };

  list.removeHead = function() {
    var oldHeadVal = list.head.value;
    if (list.head.next) {
      list.head = list.head.next;
      list.head.previous = null;
    } else {
      list.head = null;
      list.tail = null;
    }
    return oldHeadVal;
  };

  list.contains = function(target) {
    var currentNode = list.head;
    while (true) {
      if (target === currentNode.value) {
        return true;
      } else {
        if (currentNode.next === null) {
          break;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    return false;
  };



  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};