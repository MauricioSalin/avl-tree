class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;
    this.height = 1;
    this.left = null;
    this.right = null;
    this.count = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  balanceFactor(node) {
    return this.height(node.left) - this.height(node.right);
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert = (root, key) => {
    if (!root) return new Node(key);

    if (key < root.key) {
      root.left = this.insert(root.left, key);
    } else if (key > root.key) {
      root.right = this.insert(root.right, key);
    } else {
      root.count++;
      return root;
    }

    this.updateHeight(root);

    const balance = this.balanceFactor(root);

    if (balance > 1) {
      if (key < root.left.key) {
        return this.rotateRight(root);
      } else if (key > root.left.key) {
        root.left = this.rotateLeft(root.left);
        return this.rotateRight(root);
      }
    }

    if (balance < -1) {
      if (key > root.right.key) {
        return this.rotateLeft(root);
      } else if (key < root.right.key) {
        root.right = this.rotateRight(root.right);
        return this.rotateLeft(root);
      }
    }

    return root;
  };

  insertKey = (key) => {
    this.root = this.insert(this.root, key);
  };

  findMinNode = (node) => {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  };

  delete = (root, key) => {
    if (!root) return root;

    if (key < root.key) {
      root.left = this.delete(root.left, key);
    } else if (key > root.key) {
      root.right = this.delete(root.right, key);
    } else {
      if (root.count > 1) {
        root.count--;
        return root;
      } else if (!root.left || !root.right) {
        const temp = root.left || root.right;

        root = temp;
      } else {
        const temp = this.findMinNode(root.right);

        root.key = temp.key;
        root.count = temp.count;
        root.right = this.delete(root.right, temp.key);
      }
    }

    if (!root) return root;

    this.updateHeight(root);

    const balance = this.balanceFactor(root);

    if (balance > 1) {
      if (this.balanceFactor(root.left) >= 0) {
        return this.rotateRight(root);
      } else {
        root.left = this.rotateLeft(root.left);
        return this.rotateRight(root);
      }
    }

    if (balance < -1) {
      if (this.balanceFactor(root.right) <= 0) {
        return this.rotateLeft(root);
      } else {
        root.right = this.rotateRight(root.right);
        return this.rotateLeft(root);
      }
    }

    return root;
  };

  deleteKey = (key) => {
    this.root = this.delete(this.root, key);
  };

  search = (root, key) => {
    if (!root || root.key === key) return root;

    if (key < root.key) {
      return this.search(root.left, key);
    } else {
      return this.search(root.right, key);
    }
  };

  searchKey = (key) => {
    const searchResult = this.search(this.root, key);

    console.log(
      `Resultado para a chave ${key}:`,
      searchResult ? "Encontrado" : "Não encontrado"
    );
  };

  inOrderTraversal = (node, result = []) => {
    if (node) {
      this.inOrderTraversal(node.left, result);
      for (let i = 0; i < node.count; i++) {
        result.push({ key: node.key });
      }
      this.inOrderTraversal(node.right, result);
    }
    return result;
  };

  display() {
    const result = this.inOrderTraversal(this.root);
    console.log(result);
  }
}

const avlTree = new AVLTree();

avlTree.insertKey(10);
avlTree.insertKey(20);
avlTree.insertKey(30);
avlTree.insertKey(15);
avlTree.insertKey(5);
avlTree.insertKey(20);

console.log("Árvore AVL após a inserção das chaves:");
avlTree.display();

avlTree.deleteKey(20);

console.log("Árvore AVL após a exclusão da chave 20:");
avlTree.display();

avlTree.searchKey(15);