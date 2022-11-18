var runningSum = function(nums) {
    const finalArray = [];
    finalArray[0] = nums[0];
    for(let i=1; i<nums.length; i++){
        finalArray[i] = finalArray[i-1] + nums[i];
    }
    return finalArray;
};

console.log(runningSum([1,1,1,1,1]))
