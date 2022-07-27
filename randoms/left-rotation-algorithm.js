const leftMatrix = (d, arr) => {
    while(d>0){
        let interimVal = arr.shift();
        arr.push(interimVal)
        d--;
    }
    return arr;
}

console.log(leftMatrix(4, [1,2,3,4,5]));