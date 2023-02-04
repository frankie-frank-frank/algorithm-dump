/**
 * @param {number[]} inputVal
 */
function findLargest(inputVal){
    let largest = Number.NEGATIVE_INFINITY
    inputVal.forEach((item) => {
        if(item > largest) largest = item
    })
    return largest;
}

//test cases:
console.log(findLargest([1,2,3,4,5]))
console.log(findLargest([-2,-2,-1]))

/**
 * @param {number[]} inputVal
 */
function findSmallest(inputVal){
    let smallest = Number.POSITIVE_INFINITY
    inputVal.forEach((item) => {
        if(item < smallest) smallest = item
    })
    return smallest;
}

//test cases:
console.log(findSmallest([1,2,3,0,10]))
console.log(findSmallest([-1,-5,10]))