var pivotIndex = function(nums) {
    let leftSumArray = [nums[0]];
    const reducedArrSum = nums.slice(1).reduce((previousValue, currentValue) => previousValue + currentValue,0)
    if (reducedArrSum === 0 ) return 0;
    for(let i=1; i<nums.length; i++){
        const rightSumArray = nums.slice(i+1).reduce((previousValue, currentValue) => previousValue + currentValue,0);
        if(leftSumArray[i-1] === rightSumArray) return i
        leftSumArray[i] = leftSumArray[i-1] + nums[i];
    }   
    return -1;
}
console.log(pivotIndex([2,3,3, 5]))