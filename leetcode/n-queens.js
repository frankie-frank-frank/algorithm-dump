/**
 * @param {number} n
 * @return {any[]}
 */
var solveNQueens = function(n){
    //global result
    const result = []

    const dfs = (i, n, slate) => {
        //backtracking case
        let lastQ = i - 1
        console.log('i', " ", i)
        console.log('last queen' + ' ' + lastQ)
        console.log('slate', " ", slate)

        for(let prevQ = 0; prevQ < lastQ; prevQ++){
            //col conflict
            if(slate[prevQ] === slate[lastQ]) return;

            //if dia conflict
            let rowDiff = Math.abs(prevQ - lastQ);
            let colDiff = Math.abs(slate[prevQ] - slate[lastQ])
            
            if(rowDiff === colDiff) return;
        }
        //base case
        if(i === n){
            result.push(slate.slice());
            return;
        }

        //dfs recursive case
        for(let col = 0; col < n; col++){
            slate.push(col);
            dfs(i+1, n, slate);
            slate.pop()
        }
    }

    dfs(0, n, [])
    return result
}

console.log(solveNQueens(4))