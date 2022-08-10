/*
Tracking elements in a heap by index:
    parent: i / 2
    left child: i * 2
    right child: i * 2 + 1
*/

class MinHeap {
    constructor() {
        //initialize an empty value at index 0
        this.minHeap = [null]
    }
    handleAdd(input) {
        //push the element to the end of the minheap
        this.minHeap.push(input)
        //note that first element is null and second element is the new value added
        if (this.minHeap.length > 2) {
            //get current index
            let idx = this.minHeap.length - 1
            //while the current index is less than the parent index
            while (this.minHeap[idx] < this.minHeap[Math.floor(idx / 2)]) {
                if (idx >= 1) {
                    //swap the element with its parent
                    [this.minHeap[Math.floor(idx / 2)], this.minHeap[idx]] = [this.minHeap[idx], this.minHeap[Math.floor(idx / 2)]]
                    //check if the parent node is not the root node
                    if (Math.floor(idx / 2) > 1) {
                        idx = Math.floor(idx / 2)
                    } else {
                        //if it is the parent node, break out of the while loop 
                        break
                    }
                }
            }
        }
    }
    handleRemove() {
        let smallest = this.minHeap[1]
        if (this.minHeap.length > 2) {
            //set the first element to the last element in the array
            this.minHeap[1] = this.minHeap[this.minHeap.length - 1];
            //resize the array to end on the last but one element, since the first element has been set to the last element
            this.minHeap.splice(this.minHeap.length - 1);
            //if the heap contains just two elements(note that index 0 is null)
            if (this.minHeap.length === 3){
                //if the first element is bigger than the second element, swap them
                if(this.minHeap[1] > this.minHeap[2]){
                    [this.minHeap[1], this.minHeap[2]] = [this.minHeap[2], this.minHeap[1]]
                }
                return smallest
            }
            //if there are more than two elements, set index to 1, left to 2 and right to 3
            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            //while root node is more than left child or right child, keep moving it down till you reach the right spot
            //note that the tree's left value might be greater than its right value
            while(this.minHeap[i] >= this.minHeap[left] || this.minHeap[i] >= this.minHeap[right]){
                if(this.minHeap[left] < this.minHeap[right]){
                     [this.minHeap[i], this.minHeap[left]] = [this.minHeap[left], this.minHeap[i]]
                     i = 2 * i;
                } else {
                    [this.minHeap[i], this.minHeap[right]] = [this.minHeap[right], this.minHeap[i]]
                    i = 2 * i + 1;
                }
                left = 2 * i;
                right = 2 * i + 1;
                if (this.minHeap[left] === undefined || this.minHeap[right] === undefined){
                    break;
                }
            }
        }
        else if (this.minHeap.length === 2){
            this.minHeap.splice(1,1)
        }
        else {
            return null
        }
        return smallest;
    }
    
    handleSort(){
        let result = [null]
        while (this.minHeap.length > 1){
            result.push(this.handleRemove())
        }
        this.minHeap = result
        return result;
    }
}

/*
//////TESTS:
const newHeap = new MinHeap()
console.log(newHeap.minHeap)
newHeap.handleAdd(2)
newHeap.handleAdd(1)
newHeap.handleAdd(5)
newHeap.handleAdd(3)
console.log("unsorted: " , newHeap.minHeap)
newHeap.handleSort()
console.log("sorted: " , newHeap.minHeap)
newHeap.handleRemove()
newHeap.handleRemove()
console.log(newHeap.minHeap)
*/