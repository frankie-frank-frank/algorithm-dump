/**
 * @param {number[]} inputVal
 */
function QuickSort(inputVal){
    if(inputVal.length <= 1){
      return inputVal;
    }
  
    const pivot = inputVal[inputVal.length - 1];
    const leftInputVal = [];
    const rightInputVal = [];
  
    for(let i=0; i < inputVal.length-1;i++){
      inputVal[i] < pivot ? leftInputVal.push(inputVal[i]) :  rightInputVal.push(inputVal[i])
    }
  
    return [...QuickSort(leftInputVal) ,pivot,...QuickSort(rightInputVal)];
  
  }

console.log(QuickSort([1,2,4,9,8])) //1,2,4,8,9
console.log(QuickSort(["1", "aw", "2"])) //1,2,aw