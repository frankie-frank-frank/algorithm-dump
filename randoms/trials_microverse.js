function gradingStudents(grades) {
    // Write your code here
    let finalArray = []
    grades.forEach(element => {
        if(element<38){
            finalArray.push(element)
        }
        else {
            if(element % 5 > 2){
                if(element % 5 === 3){
                    finalArray.push(element+2)
                }
                else{
                    finalArray.push(element+1)
                }
            }else{
                finalArray.push(element)
            }
        }
    });
    return finalArray;
}

// console.log(gradingStudents([73,67,38,33]))


///////////////////////////////////////////////////////////////////////////////////NEXT CODE BLOCK STARTS HERE//////////////////////////////////////////////////////

let size = 9;                 
const arrayElements = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];

const countPairs = (n,arr) => {
    const finalObject = {};
    let finalCount = 0
    for (const item of arr){
        finalObject[item] = finalObject[item] ? finalObject[item] + 1 : 1;
    }
    for(const i in finalObject){
        if(finalObject[i] > 1){
            finalCount += parseInt((finalObject[i]/2))
        }
    }
    return finalCount;
}

// console.log(countPairs(size, arrayElements))

///////////////////////////////////////////////////////////////////////////////////NEXT CODE BLOCK STARTS HERE//////////////////////////////////////////////////////

const valleyCount = (str) => {
    let zeroCount = 0;
    let totalSum = 0;
    for(let i=0; i<str.length; i++){
        if(str.charAt(i) === 'D'){
            totalSum--;
        }
        else if(str.charAt(i) === 'U'){
            totalSum++;
            if(totalSum == 0) {zeroCount++;}
        }
    }
    return zeroCount
}

// console.log(valleyCount('UDDDUDUU'))
// console.log(valleyCount('DUDUD'))
// console.log(valleyCount('DUDUDU'))

// console.log((typeof(parseInt('33'))));
// console.log([2,3,4,5,6].reduce((accumulator, current) => accumulator + current))


///////////////////////////////////////////////////////////////////////////////////NEXT CODE BLOCK STARTS HERE//////////////////////////////////////////////////////

var calPoints = function(ops) {
    let outputArray = []
    ops.forEach(item => {
        if (parseInt(item)) {
            outputArray.push(parseInt(item)) 
        }
                
        if(item == '+'){
                outputArray.push(outputArray.slice(-2).reduce((accumulator, current) => accumulator + current))
                }
        if(item == 'D'){
                let val = outputArray.slice(-1)
                outputArray.push(val * 2)
                }
        if(item == 'C'){
            outputArray.pop()
        }          
    })
    return outputArray.reduce((accumulator, current) => accumulator + current)
};

///////////////////////////////////////////////////////////////////////////////////NEXT CODE BLOCK STARTS HERE//////////////////////////////////////////////////////

// //go through string and push elements into an array
// let num = (str) => {
//     let finalArray = [];
//     for (let i of str) {
//         finalArray.push(i);
//     }
//     return finalArray;
// }

// //go through the array elements and return an object-value pair of their counts
// function freq(nums) {
//     return nums.reduce((acc, curr) => {
//       acc[curr] = -~acc[curr];
//       return acc;
//     }, {});
//   }



// let expressionResult = true;
// const expressionValue = () => { return true && expressionResult};


// const expressFinal = (expression) => {
//     let interrim = freq(num(expression))
//     if(interrim['['] !== interrim[']']){
//         expressionResult = false
//         expressionValue()
//     }
//     if(interrim['{'] !== interrim['}']){
//         expressionResult = false
//         expressionValue()
//     } 
//     if(interrim['('] !== interrim[')']){
//         expressionResult = false
//         expressionValue()
//     } 
//     return expressionValue()
// }

// console.log(expressFinal('[{}]'));

let num = (str) => {
    let finalArray = [];
    for (let i of str) {
        finalArray.push(i);
    }
    return finalArray;
}
function freq(nums) {
    return nums.reduce((acc, curr) => {
      acc[curr] = -~acc[curr];
      return acc;
    }, {});
  }
let expressionResult = true;
const expressionValue = () => { return true && expressionResult};

var isValid = function(s) {
    let interrim = freq(num(s))
    if(interrim['['] !== interrim[']']){
        expressionResult = false
        expressionValue()
    }
    if(interrim['{'] !== interrim['}']){
        expressionResult = false
        expressionValue()
    } 
    if(interrim['('] !== interrim[')']){
        expressionResult = false
        expressionValue()
    } 
    return expressionValue()
    }

console.log(isValid('{[]}}'))
