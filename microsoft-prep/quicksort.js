console.log(function QuickSort(Arr){
    if(Arr.length <= 1){
      return Arr;
    }
  
    const pivot = Arr[Arr.length - 1];
    const leftArr = [];
    const rightArr = [];
  
    for(let i=0; i < Arr.length-1;i++){
      Arr[i] < pivot ? leftArr.push(Arr[i]) :  rightArr.push(Arr[i])
    }
  
    return [...QuickSort(leftArr) ,pivot,...QuickSort(rightArr)];
  
  }(['a', 'aa', 'aa.txt', 'bc.txt']));