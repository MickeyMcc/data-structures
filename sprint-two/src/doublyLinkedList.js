var DoublyLinkedList = function() {
  var doubleList = {};
  doubleList.head = null;
  doubleList.tail = null;

  doubleList.addToTail = function(value) {
    if (doubleList.tail === null) {
      doubleList.setFirstNode(value);
    } else {
      var newTail = Node(value);
      var oldTail = doubleList.tail;
      oldTail.next = newTail;
      newTail.previous = oldTail;
      doubleList.tail = newTail;
    }
  };

  doubleList.addToHead = function(value) {
    if (doubleList.head === null) {
      doubleList.setFirstNode(value);
    } else {
      var oldHead = doubleList.head;
      doubleList.head = Node(value);
      oldHead.previous = doubleList.head;
      doubleList.head.next = oldHead;
    }
  };

  doubleList.setFirstNode = function(value) {
    doubleList.tail = Node(value);
    doubleList.head = doubleList.tail;
  };

  doubleList.removeTail = function() {
    var oldTailVal = doubleList.tail.value;
    if (doubleList.tail.previous) {
      doubleList.tail = doubleList.tail.previous;
      doubleList.tail.next = null;
    } else {
      doubleList.head = null;
      doubleList.tail = null;
    }
    return oldTailVal;
  };

  doubleList.removeHead = function() {
    var oldHead = doubleList.head;
    var newHead = oldHead.next;
    if (newHead) { //if there is not only one element
      doubleList.head = newHead;
      newHead.previous = null;
    } else {
      doubleList.makeDListEmpty();
    }
    return oldHead.value;
  };

  doubleList.makeDListEmpty = function () {
    doubleList.head = null;
    doubleList.tail = null;
  };

  doubleList.contains = function(target) {
    var currentNode = doubleList.head;
    do {
      if (target === currentNode.value) {
        return true;
      } else {
        currentNode = currentNode.next;
      }
    } while (currentNode !== null);
    return false;
  };

  return doubleList;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};