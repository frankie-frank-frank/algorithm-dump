// function mainFunct(expression) {
//     const splitExpression = expression.split(' ')
//     let validExpression = false
//     for(const item of splitExpression){
//       if(["*","+","-","/"].includes(item)) validExpression = true
//     }
//     if(validExpression === false) return 0;
//     console.log(splitExpression)
//     const unvisited = []
//     let loopCounter = 0;
//     let left = 0;
//     let right = 0;
//     while(loopCounter < splitExpression.length){
//         const checkNext = loopCounter + 1 < expression.length ? true : false;
//         const currItem = splitExpression[loopCounter]
//         const nextItem = splitExpression[loopCounter + 1]
//       if(checkIfOps(currItem) && checkNext && checkIfOps(nextItem)) {
//         unvisited.push(currItem)
//       }
//       else if(checkIfOps(currItem) && checkNext && !checkIfOps(nextItem)) { 
//         const nextTwoNumbers = splitExpression[loopCounter + 2]
//         const opResults = performOps(nextItem, nextTwoNumbers, currItem)
//         console.log(currItem, nextItem, nextTwoNumbers, opResults)
//         if(right == 0 && left == 0){
//           left = opResults
//           loopCounter = loopCounter + 2;
//         }
//         else if(right == 0 && left != 0){
//           right = opResults
//           loopCounter = loopCounter + 2;
//         }
//       }
//       else if(left != 0 && right != 0){
//         const newOp = unvisited.pop()
//         left = performOps(left, right, newOp)
//         right = 0
//       }
//       else if(left != 0 && unvisited.length > 0){
//         const newOps = unvisited.pop()
//         console.log(currItem)
//         left = performOps(left, currItem, newOps)
//       }
//     loopCounter++;
//     }
//     return left;
//   }

function funcTwo(expression){
    const splitExpression = expression.split(' ')
    let validExpression = false
    for(const item of splitExpression){
      if(["*","+","-","/"].includes(item)) validExpression = true
    }
    if(validExpression === false) return 0;

    //get recursive items
    let recursiveArray = []
    let opArray = []
    let loopCounter = 0

    while(loopCounter < splitExpression.length){
        const checkNextTwo = loopCounter + 2 < expression.length ? true : false;            
        const currItem = splitExpression[loopCounter]
        if(checkIfOps(currItem) && checkNextTwo){
            const nextItem = splitExpression[loopCounter + 1]
            const nextTwoItems = splitExpression[loopCounter + 2]
            if(!checkIfOps(nextItem) && !checkIfOps(nextTwoItems)){
                const opsResult = performOps(nextItem, nextTwoItems, currItem)
                recursiveArray.push(opsResult)
                loopCounter+=2
            }
            else {
                opArray.push(currItem)
            }
        }  else{
            recursiveArray.push(currItem)
        }
        loopCounter++
    }

    if(opArray.length > 0){
        const opA = Number.isInteger(recursiveArray[0]) ? recursiveArray[0] : parseInt(recursiveArray[0])
        const opB = Number.isInteger(recursiveArray[1]) ? recursiveArray[1] : parseInt(recursiveArray[1])
        return performOps(opA, opB, opArray[0])
    }
    return recursiveArray[0]
}
  
function performOps(a,b,op){
const parseInta = parseInt(a)
const parseIntb = parseInt(b)
if(op == "*") return parseInta * parseIntb
if(op == "/") return parseInta / parseIntb
if(op == "+") return parseInta + parseIntb
if(op == '-') return parseInta - parseIntb
}

function checkIfOps(inputVal){
if(["*","+","-","/"].includes(inputVal)) return true
return false
}

console.log(funcTwo("* + 3 4 5"))
console.log(funcTwo("- 3 * 4 5"))
console.log(funcTwo("+ 3 4"))