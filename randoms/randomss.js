/*
    NUMBER 1:
*/
// let date = new Date(2022, 8, 1)
// let date2 = new Date(2022, 8, 1)

// const currentDate = new Date(2022, 8, 1)
// const currentMonth = currentDate.getMonth()
// const nextMonth = currentMonth + 1
// const currentYear = currentDate.getFullYear()
// let startDateVal = new Date(currentYear, currentMonth)
// let endDateVal = new Date(currentYear, nextMonth)

// let currentEndDate = endDateVal.getDate()
// currentEndDate = currentEndDate - 1
// endDateVal.setDate(currentEndDate)
// console.log(startDateVal, endDateVal)

/*
    NUMBER 2:
*/
// const encodedData = btoa('hello')
// const decodedData = atob(encodedData)
// console.log(decodedData)

/*
    NUMBER 3: Replace leading zeros: Incomplete at section commented as incomplete
*/

/*
const findMin = (x,y) => {
    return parseInt(x) < parseInt(y) ? x : y
}
const findMax = (x,y) => {
    const tern2 = parseInt(y) > parseInt(x) ? x : y
    return x === undefined ? y : tern2  
}
const replaceLeadingZeros = (element) => {
    const elementAsString = element.toString()
    let zeroIndexMax;
    let nonZeroIndexInit;
    elementAsString.split('').forEach(item => {
        //get first non-zero index
        if (parseInt(item) !== 0){
            nonZeroIndexInit = findMin(nonZeroIndexInit, elementAsString.indexOf(item))
        }
        // INCOMPLETE: get last zero index below
        // get last zero index before first non-zero index
        if (parseInt(item) === 0 && nonZeroIndexInit > item){
            console.log(item)
            zeroIndexMax = findMax(zeroIndexMax, elementAsString.indexOf(item))
        }
    })
    return nonZeroIndexInit + ' ' + zeroIndexMax
}

console.log(replaceLeadingZeros('000222'))
// const nonZeroVal = undefined
// const zeroVal = 0
// const oneVal = 1

// console.log(findMin(1, 0))
*/