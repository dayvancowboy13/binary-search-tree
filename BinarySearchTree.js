import TreeNode from './TreeNode.js';

export default class BinarySearchTree {

    constructor(arr) {

        // console.log('Tree created! :)');
        arr = this.#processArray(arr);
        this.root = this.#buildTree(arr);


    }

    insert(value, root = this.root) {

        let nextNode = null;
        if (value === root.value) throw new Error('That value already exists on the tree');
        else if (value < root.value) {

            if (root.leftChild === null) {

                root.leftChild = new TreeNode(value);
                return;

            } else nextNode = root.leftChild;

        } else {

            if (root.rightChild === null) {

                root.rightChild = new TreeNode(value);
                return;

            } else nextNode = root.rightChild;

        }

        this.insert(value, nextNode);

    }

    delete(value) {

        // find the node; does it have children? how many?

        let currentNode = this.root;
        let previousNode = null;

        // this loop finds the node
        while (currentNode.value !== value) {

            if (value < currentNode.value) {

                if (currentNode.leftChild !== null) {

                    previousNode = currentNode;
                    currentNode = currentNode.leftChild;

                } else throw new Error('Value not found on the tree');

            } else if (value > currentNode.value) {

                if (currentNode.rightChild !== null) {

                    previousNode = currentNode;
                    currentNode = currentNode.rightChild;

                } else throw new Error('Value not found on the tree');

            }

        }
        // 3 possibilities:
        // 1). delete leaf node
        // console.log(`previousNode: ${previousNode.value} \ncurrentNode: ${currentNode.value}`);
        if (currentNode.leftChild === null && currentNode.rightChild === null) {

            if (previousNode.leftChild === currentNode) previousNode.leftChild = null;
            else previousNode.rightChild = null;

        } else if (currentNode.leftChild === null) { // 2). node has a single child

            if (previousNode.leftChild === currentNode) previousNode.leftChild = currentNode.rightChild;
            else previousNode.rightChild = currentNode.rightChild;

        } else if (currentNode.rightChild === null) {

            if (previousNode.leftChild === currentNode) previousNode.leftChild = currentNode.leftChild;
            else previousNode.rightChild = currentNode.leftChild;

        } else { // 3). node has two children

            let tempRoot = currentNode;
            currentNode = currentNode.rightChild;
            // if the node has a left child, there is still a smaller number in the tree
            while (currentNode.leftChild !== null) {

                previousNode = currentNode;
                currentNode = currentNode.leftChild;

            }

            previousNode.leftChild = null;
            tempRoot.value = currentNode.value;

        }

    }

    find(value, root = this.root) {

        if (root === null) throw new Error('That value is not on the tree');
        else if (root.value === value) return root;
        else if (value < root.value) root = this.find(value, root.leftChild);
        else if (value > root.value) root = this.find(value, root.rightChild);

        return root;

    }

    levelOrder(callBack = null) {

        if (callBack === null) throw new Error('A call-back function must be provided!');
        else {

            let queue = [];
            queue.push(this.root);
            let currentNode;

            while (queue.length !== 0) {

                currentNode = queue.shift();
                callBack(currentNode);
                if (currentNode.leftChild !== null) queue.push(currentNode.leftChild);
                if (currentNode.rightChild !== null) queue.push(currentNode.rightChild);

            }

        }

    }

    inOrder(callBack = null, node = this.root) {

        if (callBack === null) throw new Error('A call-back function must be provided!');
        else {

            if (node !== null) {

                this.inOrder(callBack, node.leftChild);
                callBack(node);
                this.inOrder(callBack, node.rightChild);

            }

        }

    }

    preOrder(callBack = null, node = this.root) {

        if (callBack === null) throw new Error('A call-back function must be provided!');
        else {

            if (node !== null) {

                callBack(node);
                this.preOrder(callBack, node.leftChild);
                this.preOrder(callBack, node.rightChild);

            }

        }

    }

    postOrder(callBack = null, node = this.root) {

        if (callBack === null) throw new Error('A call-back function must be provided!');
        else {

            if (node !== null) {

                this.postOrder(callBack, node.leftChild);
                this.postOrder(callBack, node.rightChild);
                callBack(node);

            }

        }

    }

    height(node = this.root) {

        let leftHeight = 0;
        let rightHeight = 0;

        if (node === null) return 0;
        else {

            leftHeight = this.height(node.leftChild);
            rightHeight = this.height(node.rightChild);
            return Math.max(leftHeight, rightHeight) + 1;

        }

    }

    depth(node) {

        // Depth is defined as the number of edges in the path from a given node to the tree’s root node
        let currentNode = this.root;
        let depthVal = 0;

        while (node !== currentNode) {

            if (node.value < currentNode.value) currentNode = currentNode.leftChild;
            else if (node.value > currentNode.value) currentNode = currentNode.rightChild;

            depthVal++;

        }

        return depthVal;

    }

    isBalanced() {

        let rightHeight = this.height(this.root.rightChild);
        let leftHeight = this.height(this.root.leftChild);
        let difference = rightHeight - leftHeight;

        if (Math.abs(difference) > 1) return false;
        else return true;

    }

    rebalance() {

        function blah(e) {

            return e.value;

        }

        if (this.isBalanced()) throw new Error('Tree is already balanced');
        else {

            let arr = [];
            this.inOrder((n) => {

                arr.push(n.value);

            });
            console.log(arr);
            this.root = this.#buildTree(arr);

        }

    }

    #buildTree(arr) {

        if (arr.length < 1) {

            return null;

        }

        let mid = Math.floor(arr.length / 2);
        let root = new TreeNode(arr[mid]);

        root.leftChild = this.#buildTree(arr.slice(0, mid));
        root.rightChild = this.#buildTree(arr.slice(mid + 1, arr.length));

        return root;


    }

    #processArray(arr) {

        let sorted = arr.sort((a, b) => {

            return a - b;

        });

        let processed = [];

        for (let i = 0; i < sorted.length; i++) {

            if (!processed.includes(sorted[i])) processed.push(sorted[i]);

        }

        return processed;

    }

    prettyPrint(
        node = this.root, prefix = '', isLeft = true
    ) {

        if (node === null) {

            return;

        }
        if (node.rightChild !== null) {

            this.prettyPrint(
                node.rightChild, `${prefix}${isLeft
                    ? '│   '
                    : '    '}`, false
            );

        }
        console.log(`${prefix}${isLeft
            ? '└── '
            : '┌── '}${node.value}`);
        if (node.leftChild !== null) {

            this.prettyPrint(
                node.leftChild, `${prefix}${isLeft
                    ? '    '
                    : '│   '}`, true
            );

        }

    }

}