class NodeClass {
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }

    addRight(elem){
        return this.right = new NodeClass(elem)
    }

    addLeft(item){
        return this.left = new NodeClass(item)
    }
}

//create a tree of nodes
const rootNode = new NodeClass(3)
const rightChild = rootNode.addLeft(20)
const leftChild = rootNode.addRight(9)
const rightRight = rightChild.addRight(15)
const rightLeft = rightChild.addLeft(7)
console.log(rightRight)

function levelOrder(root){
    if(!root){
        return []
    }
    const queue = [root]
    const result = []
    while(queue.length){
        let len = queue.length;
        result.push(queue.map(item => item.value))

        while(len--){
            const currItem = queue.shift()
            if(currItem.left) queue.push(currItem.left)
            if(currItem.right) queue.push(currItem.right)
        }
    }
    return result
}
console.log(levelOrder(rootNode))