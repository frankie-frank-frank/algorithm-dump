const trialObject = {
    a: {
        a1: 22,
        a2: {
            a2a: 12,
            a2b: 'Twelve',
            a2c: 12,
            a2d: 14
        }
    },
    b: 3,
    c: {
        milo: 'drink'
    }
}

class Solution{

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

    //create a method to sort using heapSort
    heapSort(arr){
        const length = arr.length;
        let lastParentIndex = Math.floor(length / 2 - 1)
        let lastChildIndex = length - 1

        //this alone creates the max heap
        while(lastParentIndex >= 0){
            const heapified = this.heapify(arr, length, lastParentIndex);
            lastParentIndex--;
        }

        //this is an implementation for heap sorting
        while(lastChildIndex >= 0){
            [arr[0], arr[lastChildIndex]] = [arr[lastChildIndex], arr[0]]
            const heapifiedAgain = this.heapify(arr, lastChildIndex, 0)
            lastChildIndex--;
        }

        return arr;
    }

    //create a method for traversal
    travObj(objectGiven){
        if(!objectGiven) return []
        const queue = [objectGiven]
        const result = []
        while(queue.length){
            let len = queue.length;
            queue.forEach((item) => {
                //if it is a number, string or float
                if(typeof(item) === 'number'){
                    if(!result.includes(item)) result.push(item);
                }
            })
            while(len--){
                //if it is an object
                const currItem = queue.shift()
                if(typeof(currItem) === 'object'){
                    const values = Object.values(currItem)
                    values.forEach(item => queue.push(item))
                }
            }
        }
    
        return result
    }

    traverseAndSort(objectGiven){
        const arrResult = this.travObj(objectGiven);
        return this.heapSort(arrResult)
    }

}

// TEST:
const newHeap = new Solution()
console.log(newHeap.traverseAndSort(trialObject))