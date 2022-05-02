const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    this.base = addItem(this.base, data);

    function addItem(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addItem(node.left, data);
      } else {
        node.right = addItem(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchItem(this.base, data);

    function searchItem(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ? 
      searchItem(node.left, data) : 
      searchItem(node.right, data);
    }
  }

  find(data) {
    if (!this.base) return undefined;
    let current = this.base,
        found = false;
  
    while (current && !found) {
      if (data < current.data) current = current.left;
      else if (data > current.data) current = current.right;
      else found = true;
    };
  
    if (!found) return null;
    return current;
  };

  remove(data) {
    this.base = removeNode(this.base, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
    
  }

  min() {
    if (!this.base) {
      return null;
    }

    let node = this.base;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.base) {
      return null;
    }

    let node = this.base;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};