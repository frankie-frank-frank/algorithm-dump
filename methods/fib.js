function fib(n){
    let init = 1;
    let next = 0;
    let current = 0;
    let count = 1;
    if(n == 1){
        return 1
    }
    while(n>count){
        current = init + next;
        next = init;
        init = current;
        count++
    }
    return current
}

// 1 2 3 5 8 13 21 34 ...

// let km = 10
// while(km > 0){
//     console.log(fib(km))
//     km--;
// }
console.log(fib(51))