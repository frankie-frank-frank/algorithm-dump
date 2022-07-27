function fib(n){
    let init = 1;
    let next = 0;
    let current = 0;
    let k = 1;
    if(n == 1){
        return 1
    }
    while(n>k){
        current = init + next;
        next = init;
        init = current;
        k++
    }
    return current
}

// let km = 10
// while(km > 0){
//     console.log(fib(km))
//     km--;
// }
console.log(fib(51))