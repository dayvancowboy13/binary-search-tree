#!/usr/bin/env node
import BinarySearchTree from './BinarySearchTree.js';

const arr = generateRandomIntArray(
    15, 1, 100
);

const bt = new BinarySearchTree(arr);

bt.prettyPrint();


// bt.levelOrder(callBack);

let newArr = generateRandomIntArray(
    15, 100, 200
);
console.log(newArr);
newArr = processArray(newArr);

console.log(arr);
console.log(newArr);


// newArr.forEach((elem) => {

//     bt.insert(elem);

// });

// bt.prettyPrint();
// console.log(bt.isBalanced());
// bt.rebalance();
// bt.prettyPrint();

// console.log('------- Level Order -------');
// bt.levelOrder(callBack);
// console.log('------- Pre Order -------');
// bt.preOrder(callBack);
// console.log('------- In Order -------');
// bt.inOrder(callBack);
// console.log('------- Post Order -------');
// bt.postOrder(callBack);


function generateRandomIntArray(
    n, low, high
) {

    let arr = [];

    for (let i = 0; i <= n; i++) {

        // allows for non-zero low values
        arr.push(Math.floor(Math.random() * (high - low) + low));

    }

    return arr;

}

function processArray(arr) {

    let sorted = arr.sort((a, b) => {

        return a - b;

    });

    let processed = [];

    for (let i = 0; i < sorted.length; i++) {

        if (!processed.includes(sorted[i])) processed.push(sorted[i]);

    }

    return processed;

}

function callBack(e) {

    console.log(e.value);

}