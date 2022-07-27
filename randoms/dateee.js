// function firstDayOfMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth(), 1)
//   }

//   function lastDayOfMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0)
//   }
//   function nextDay(date) {
//     return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
//   }

// const firstDay = firstDayOfMonth(new Date(2019, 2, 7))
// const lastDay = lastDayOfMonth(new Date(2019, 2, 7))
// let loopA = new Date(firstDay) 
// let totalDays = 0
// // while(loopA <= lastDayOfMonth(new Date(2019, 2, 7))){
// //     console.log(loopA);
// //     let newDate = loopA.setDate(loopA.getDate() + 1);
// //     loopA = new Date(newDate);
// //     totalDays +=1
// //   }
// //console.log(totalDays)

// const getDays = (year, month) => {
//     return new Date(year, month, 0).getDate();
// };

// const val = "2019-03".split('-')
// const newDate = getDays(val[0], val[1])
// //console.log(newDate)

// const monthee = {
//     id: 22 / 7
// }
// const ttt = {
//     id: 22 / 3
// }
// const vaaaa = parseFloat(monthee.id)
// const vvv = parseFloat(ttt.id)

// const date1 = new Date('2022-03-24');
// const date2 = new Date('2022-04-24');
// const date3 = new Date('2022-12-24');
// const dattt = [date1, date2, date3]

// const start = new Date('2022-03-18');
// const end = new Date('2022-11-22');

// // dattt.forEach(date => {
// // if (date > start && date < end) {
// //   console.log('✅ date is between the 2 dates');
// // } else {
// //   console.log('⛔️ date is not in the range');
// // }})

// // console.log(new Date("2020-02"))

const trymonth = "2019-09"
const trysubscriptions = {
    monthlyPriceInDollars: 4
}
const usersList = [
    {
        id: 1,
        activatedOn: new Date("2019-09-12"),
        deactivatedOn: new Date("2020-09-09")
    },
    {
        id: 2,
        activatedOn: new Date("2019-09-15"),
        deactivatedOn: new Date("2020-09-09")
    },
    {
        id: 3,
        activatedOn: new Date("2019-09-18"),
        deactivatedOn: new Date("2020-09-09")
    }
]

function billFor(month, activeSubscription, users) {
    // your code here!
    if(users.length === 0){
      return parseFloat(0.00)
    }
    if(activeSubscription === undefined || activeSubscription === null){
      return parseFloat(0.00)
    }
    const valForFirstDay = new Date(month)
    const getDays = (year, monthly) => {
      return new Date(year, monthly, 0).getDate();
    };
    const monthSplit = month.split('-')
    const getNumberOfDays = parseInt(getDays(monthSplit[0], monthSplit[1]))
    const monthlyPrice = parseInt(activeSubscription.monthlyPriceInDollars)
    const dailyRate = parseFloat(monthlyPrice/getNumberOfDays)
    
    //get days in the month
    const firstDay = firstDayOfMonth(valForFirstDay)
    const lastDay = lastDayOfMonth(valForFirstDay)
    let loopA = new Date(firstDay) 
    let totalDays = 0
    let totalAccrued = 0
    //for each day, check if users are active on that day. if they are, increase the local count
    while(loopA <= lastDay){
      let newDate = loopA.setDate(loopA.getDate() + 1);
      let userCount = 0
      console.log(newDate)
      users.forEach(user => {
        if(newDate > user.activatedOn && newDate < user.deactivatedOn){
          userCount++
        }
      })
      console.log(userCount)
        //multiply active users by dailyRate and sum
      totalAccrued = totalAccrued + (userCount * dailyRate)
      loopA = new Date(newDate);
    }
    return totalAccrued.toFixed(2)
  }
  function firstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }
  function lastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }
  function nextDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  }

  console.log(billFor(trymonth, trysubscriptions, usersList))























//console.log(vvv)
//console.log(parseFloat(vaaaa/vvv))
//console.log(vaaaa, typeof(vaaaa))
// console.log(firstDay)
// console.log(lastDayOfMonth(new Date(2019, 2, 7)))
// const start = new Date("02/05/2020");
// const end = new Date("02/10/2020");
// let loop = new Date(start);
// while (loop <= end) {
//   console.log(loop);
//   let newDate = loop.setDate(loop.getDate() + 1);
//   loop = new Date(newDate);
// }