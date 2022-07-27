/*
function solution(words, k) {
    let finalArray = [];
    for(let word of words){
        let wordLength = word.length;
        let count = 0;
        while(count < wordLength){
            finalArray.push(word.substring(count, wordLength));
            count += 1;
        }
    }
    return finalArray
}

function freq(nums) {
    return nums.reduce((acc, curr) => {
      acc[curr] = -~acc[curr];
      return acc;
    }, {});
  }

let j = solution(['man', 'tam','pan'], 2)
let m = freq(j)
console.log(m)

function maximal(obj){
    let kim = Object.keys(obj);
    let max = 0
    //find maximum
    kim.forEach((key, _index) => {
        if(obj[key] > max){
            max = obj[key]
        }
    });
    
    
}

*/
// for (let k in kim){
//     console.log(onj[man])
// }
// console.log(maximal(m))


// let finalArr = []
// 'my name is frank'.split(' ').forEach(word => {
//     let trimmedWord = word.trim()
//     if (trimmedWord !== '') {
//       finalArr.push(trimmedWord);
//     }
//   });

// console.log(finalArr.join(" ") + ".")

// function isOver(){
//     return 'ssdbd'.length > 0 ? false : true;
// }

// console.log(isOver())

// function createCountdown(initialValue) {
//     if (!Number.isInteger(initialValue) || initialValue < 1) {
//       throw new Error('Invalid initial value');
//     }
  
//     // TODO: complete this function
//     return {
//         tick(){
//           let currentValue = initialValue;
//           if(initialValue > 0){
//             initialValue--;
//             return currentValue;
//           };
//         },
        
//         isOver(){
//           return initialValue > 0 ? false : true
//         }
//       }
//     }
  

// let count = createCountdown(3);
// console.log(count.tick(), count.isOver())
// console.log(count.tick())
// console.log(count.tick())

let spreadObject = {
    id: ['mall', 'hall']
}

const action = {
    id: 'id',
    comments: ['di','daa']
}

spreadObject[action.id].push('22')
const item = {
    [action.id]:spreadObject[action.id]
}
console.log(item)
// console.log(spreadObject)