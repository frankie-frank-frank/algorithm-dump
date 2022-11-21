let list1Idx = 0;
const finalArr = [];
const forArrays = (list1, list2) => {
    for(let item of list2){
        if(list1[list1Idx] > item || list1[list1Idx] === item){
            finalArr.push(item)
            finalArr.push(list1[list1Idx])
            list1Idx++;
        } else {
            while(list1[list1Idx] < item){
                finalArr.push(list1[list1Idx])
                list1Idx++;
            }
            finalArr.push(item)
        }
    }
    return finalArr;
}

console.log(forArrays([1,2,4], [1,3,4]))