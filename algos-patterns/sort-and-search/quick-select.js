/**
 * @param {number[]} inputVal
 * @param {number} kthIndex
 * @param {string} type
 */
function QuickSelect(inputVal, kthIndex, type){
    const expectedKthIndex = type === 'largest' ? inputVal.length - kthIndex : kthIndex - 1
    if(expectedKthIndex > inputVal.length || expectedKthIndex < 0) return -1
    function RecursiveHelper(input, currIdx){
        //4 => 2 - 1 = 1, 5 => 3 - 1 = 2
    const pivotIdx = input[Math.ceil(input.length / 2) - 1]
    const pivotValue = input[pivotIdx]
    const currCorrectIdx = currIdx + pivotIdx + 1
    
    // NB: Follow this  order

    //if larger, set the pivot to middle of right array and update value of pivot
    //index to Math.ceil(inputVal.length) + incoming pivot index

    //if smaller, use incoming pivot index - Math.ceil

    //if currCorrectIdx is the index, sort and return that index
    }
    RecursiveHelper(inputVal, kthIndex)
    
}
