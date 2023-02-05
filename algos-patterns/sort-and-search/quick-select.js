/*
    QUICKSELECT FOR LARGEST ARRAY
*/
const findKthLargest = function(nums, k) {
    const targetIndex = nums.length - k
    return quickSelect(0, nums.length - 1, nums, targetIndex)
};

const quickSelect = function (start, end, nums, targetIndex) {
    let partitionIndex = getPartition(start, end, nums)
    if (partitionIndex < targetIndex)
        return quickSelect(partitionIndex + 1, end, nums, targetIndex)
    else if (partitionIndex > targetIndex)
        return quickSelect(start, partitionIndex - 1, nums, targetIndex)
    else
        return nums[partitionIndex]
}

const getPartition = function (start, end, nums) {
    let i = start, j = start
    while (j < end) {
        //assurance that all elements to the left are smaller than element at nums[end]
        if (nums[j] < nums[end]) {
            swap(i, j, nums)
            i++
        }
        j++
    }
    swap(i, end, nums)
    return i;
}

const swap = function (a, b, nums) {
    let temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
}

console.log(findKthLargest([1,2,5,1,5,8], 2))