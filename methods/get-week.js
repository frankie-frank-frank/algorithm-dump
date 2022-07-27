//A simple way to get the first and last days of the week in javascript
//Note that since variables are pointed to by reference, you will
function getWeek(dateVal) {
    const dateVal1 = new Date(dateVal)
    const dateVal2 = new Date(dateVal)
    let getStartDay = dateVal1.getDay()
    let getEndDay = dateVal2.getDay()
    let currentStartDate = dateVal1.getDate()
    let currentEndDate = dateVal2.getDate()
    while (getStartDay > 0) {
        currentStartDate = currentStartDate - 1
        getStartDay--
    }
    while (getEndDay < 6) {
        currentEndDate++;
        getEndDay++;
    }
    dateVal1.setDate(currentStartDate)
    dateVal2.setDate(currentEndDate)
    return {
        firstDay: dateVal1,
        lastDay: dateVal2
    }
}

console.log(getWeek(new Date(2022,7,7)))