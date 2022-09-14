function subsets(nums){
    const result = [];

    const dfs = (i, nums, slate) => {
        if(i === nums.length){
            const slateVal = slate.slice()
            result.push(slateVal)
            return;
        }
        dfs(i+1, nums, slate);

        slate.push(nums[i])
        dfs(i+1, nums, slate)
        slate.pop()
    }
    dfs(0, nums, [])
    return result;
}

console.log(subsets([1,2,3]))