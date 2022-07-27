//determine data type of an object
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
const isArray = isType('Array')
// console.log(isArray([]))
// console.log(Object.prototype.toString.call('ale'))

//loop to implement the array map method
const myMap = function(cb, context){
    let finalArray = Array()
    for(let i=0; i<this.length; i++){
        finalArray[i] = cb(context, this[i], i, this)
    }
    return finalArray;
}

Array.prototype.myMap = myMap;

// console.log([1,2,3].myMap(val => {return val*2}))

//reduce to implement array map method
const myReduceMap = function(cb, context){
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, current, index) => {
        return [...pre, cb.call(context, current, index, this)]
    }, [])
}
Array.prototype.myReduceMap = myReduceMap;
// console.log(Array.prototype.myReduceMap)
//console.log([1,2,3].myReduceMap(val => {
//    return val*2}))

//loop to implement the array filter method
const selfFilter = function(cb, context){
    
}

const arr = [1,2,3,4,5]
// console.log(arr.filter(item => {
//     return item%2 !== 0
// }))
