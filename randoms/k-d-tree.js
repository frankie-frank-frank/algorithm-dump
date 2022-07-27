//to do
//insert
//compare based on left or right and also depth%2

//structure
// class Node = {
//     constructor(x, y, aligh){
//         this.x = x;
//         this.y = y;
//     }
// }
class BinaryTree {
    constructor(value, depth = 0) {
        this.x = value[0];
        this.y = value[1];
        this.depth = depth;
        this.left = null;
        this.right = null;
    }
    //check for alignment
    //create
    insert(element) {
        if(element%2 == 0){}
        // if (value < this.value) {
        // if (!this.left) {
        //     this.left = new BinaryTree(value, this.depth + 1);
        // } else {
        //     this.left.insert(value);
        // }
        // } else {
        // if (!this.right) {
        //     this.right = new BinaryTree(value, this.depth + 1);
        // } else {
        //     this.right.insert(value);
        // }
        // }
    }

    // getNodeByValue(value) {
    //     if (this.value === value) {
    //     return this;
    //     } else if ((this.left) && (value < this.value)) {
    //         return this.left.getNodeByValue(value);
    //     } else if (this.right) {
    //         return this.right.getNodeByValue(value);
    //     } else {
    //     return null;
    //     }
    // }
    // depthFirstTraversal(){
    //     if(this.left){
    //     this.left.depthFirstTraversal();
    //     }
    //     console.log(this.value, this.depth);
    //     if(this.right){
    //     this.right.depthFirstTraversal();
    //     }
    // }
    // deleteNodeByDepth(){}
    // deleteNodeByValue(){}
    };


//implementation
// function KDTree(arr){
//     const bt = new BinaryTree(arr[0])
//     for(let i=1;i<arr.length;i++){
//         bt.insert(arr[i])
//     }
//     return bt
// }

// console.log(KDTree([ [3, 6], [17, 15], [13, 15], [6, 12], [9, 1], [2, 7], [10, 19] ]))
const newBinaryTree = new BinaryTree([2,3]);
console.log(newBinaryTree)