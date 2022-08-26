/*
    Expect a time complexity of nlogn
*/

class MaxHeap{

    heapify(arr, length, parentIndex){
        let largest = parentIndex;
        let left = parentIndex*2 + 1
        let right = left + 1
    
        if(left < length && arr[left] > arr[largest]){
            largest = left
        }

        if(right < length && arr[right] > arr[largest]){
            largest = right
        }

        if(largest !== parentIndex){
            [arr[parentIndex], arr[largest]] = [arr[largest], arr[parentIndex]]
            this.heapify(arr, length, largest)
        }
        return arr;
    }

    heapSort(arr){
        const length = arr.length;
        let lastParentIndex = Math.floor(length / 2 - 1)
        let lastChildIndex = length - 1

        //this alone creates the max heap
        while(lastParentIndex >= 0){
            const heapified = this.heapify(arr, length, lastParentIndex);
            console.log("last parent: " + heapified)
            lastParentIndex--;
        }

        //this is an implementation for heap sorting
        while(lastChildIndex >= 0){
            [arr[0], arr[lastChildIndex]] = [arr[lastChildIndex], arr[0]]
            const heapifiedAgain = this.heapify(arr, lastChildIndex, 0)
            console.log("last child: " + heapifiedAgain)
            lastChildIndex--;
        }

        return arr;
    }
}

const newHeap = new MaxHeap()
console.log(newHeap.heapSort([4,6,3,2,9]))

//add to max heap
//remove from max heap 