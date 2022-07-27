//take a string and generate all substrings:
let generateAllSubsForWord = function(str){
    let finalArr = []
    for(let elem = 0; elem < str.length; elem++){
        let count = 1;
        for (let item = elem; count < str.length + 1; count++){
            if(item+count<str.length+1){
                finalArr.push(str.substring(item, (item+count)))
            }
    }
    }
    finalArr = finalArr.filter(item => item.length > 2)
    return finalArr;
}

//filter out duplicates:
var removeDuplicates = function(nums) {
    let filteredArr = [];
    nums.forEach((item) => {
        if(!filteredArr.includes(item)) {
            filteredArr.push(item);
        }
    })

  return filteredArr;
}

//generate all possible substrings for an input string array:
let generateSubs = function(subArray){
    let finalArraySet = []
    subArray.forEach(item => {
        finalArraySet.push(removeDuplicates(generateAllSubsForWord(item)))
    })
    return finalArraySet;
}

//concatenate all resulting arrays
const concatArrays = (arr) => {
    let finalSet = []
    for(let i of arr){
        for(let j of i){
        finalSet.push(j)
        }
    }
    // console.log(finalSet)
    return finalSet;
}

//count all unique occurrences:
const uniqueCount = (arr) => {
    let finalObj = {}
    for (let item of arr){
        if(finalObj[item]){
            finalObj[item] += 1
        }
        else {
            finalObj[item] = 1
        }
    }
    // console.log(finalObj)
    return finalObj;
}

const summationFunction = (arr) => {
    return uniqueCount(concatArrays(generateSubs(arr)))
}

//find max items:
const findMax = (obj) => {
    let maxVal = 0;
    let maxObj = {};
    let maxWordLength = 0;
    //find all max Counts:
    console.log(obj)
    Object.values(obj).forEach(item => {
        if(item > maxVal){
            maxVal = item
        }
    })
    Object.keys(obj).forEach((key, index) => {
        if(obj[key] == maxVal){
            // console.log(`${key}, ${obj[key]} `)
            maxObj[key] = obj[key]
        }
    })
    //find all max lengths for the max count elements
    for(let item in maxObj){
        // console.log(Number(item.length))
        // console.log(item, item.length)
        if(item.length > maxWordLength){
            maxWordLength = item.length
        }
    
    //return Object.entries(obj).sort((a,b) => b[1] - a[1])
    }
    return Object.keys(maxObj).filter(item => {
        // console.log(item, item.length, maxWordLength)
        if(item.length == maxWordLength){
            return item
        }
    })
}
console.log(findMax(summationFunction(['alistaire', 'mudiaystairy', 'stairy', 'staire', 'stairy', 'staire','stairy', 'staire','stairy', 'staire'])))
// let valu = summationFunction(['alistair', 'mudiaystair', 'stephon'])
// console.log(concatArrays(generateSubs(['alistair', 'mudiay', 'stephon'])))
// console.log(generateSubs(['alistair', 'mudiay', 'stephon']).length)
// const arr1 = [1,2,3,4,5,6,7,8,9]
// const arr2 = [1,2,3,4,5,6,7,8,9]

// function splitCompare(elem1, elem2){
//     // console.log(elem1)
//     console.log(elem1.length)
//     for(let i = 0; i<elem1.length; i+=1){
//         console.log(i)
//         // if(elem2.includes(elem1[i])){
//         //     // console.log(elem1[i])
//         //     elem1.splice(i,1)
//         //     elem2.splice(i,1)
//         // }
//     }
// }
// splitCompare(arr1, arr2);
// console.log(arr1)
// console.log(14 + 'age')
