//it returns an object
function freq(nums) {
    return nums.reduce((acc, curr) => {
      acc[curr] = -~acc[curr];
      console.log(acc)
      return acc;
    }, {});
  }
  
  console.log(freq(['a', 'b', 'c', 'c', 'c', 'c', 'd', 'd']))