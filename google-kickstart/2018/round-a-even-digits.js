function checkAllEven(num){
    const numToStr = JSON.stringify(num)
    let flag = true
    numToStr.split("").forEach(item => {
        const strToNum = parseInt(item)
        if(strToNum % 2 !== 0){
            flag = false
        }
    })
    return flag
}

function solution(num){
    let loopNum = num
    let flag = checkAllEven(loopNum)
    if(checkAllEven(num) === true){
        return num
    }
    let counter = 1
    let sign = false //negative
    while(flag === false){
        //start from -1
        if(sign === false){
            loopNum = loopNum - counter
        }
        else if(sign === true){
            loopNum = loopNum + counter
        }
        if(checkAllEven(loopNum) === true){
            flag = true
            break
        }
        sign = !sign
        counter++;
    }
    return loopNum
}

//TESTING
console.log(solution(32))