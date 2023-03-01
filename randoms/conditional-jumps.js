////all numbers from 1 to n-1 which are not multiples of 5
////ie. jump all multiples of 5
let k = 1
let arr = [];

while( k < 12){
    arr.push(k)
    if(k%5 == 0){
        arr.pop()
    } 
    k+=1
}

//test:
//console.log(arr)
