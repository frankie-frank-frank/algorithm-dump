let date = new Date(2022, 8, 1)
let date2 = new Date(2022, 8, 1)

const currentDate = new Date(2022, 8, 1)
const currentMonth = currentDate.getMonth()
const nextMonth = currentMonth + 1
const currentYear = currentDate.getFullYear()
let startDateVal = new Date(currentYear, currentMonth)
let endDateVal = new Date(currentYear, nextMonth)

let currentEndDate = endDateVal.getDate()
currentEndDate = currentEndDate - 1
endDateVal.setDate(currentEndDate)
console.log(startDateVal, endDateVal)