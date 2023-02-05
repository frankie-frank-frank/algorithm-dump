/*
    leetcode 62: unique paths
*/

/**
 * @param {number} m
 * @param {number} n
 */
function UniquePaths(m,n){
    const matrix = new Array(m).fill(1).map(() => new Array(n).fill(0))
    for(let rIndex = 0; rIndex < m; rIndex++){
        for(let cIndex = 0; cIndex < n; cIndex++){
            if(cIndex == 0 && rIndex == 0) matrix[rIndex][cIndex] = 1
            else {
                const prevRowValue = rIndex -1 >= 0 ? matrix[rIndex-1][cIndex] : 0
                const prevColValue = cIndex - 1 >= 0 ? matrix[rIndex][cIndex - 1] : 0
                matrix[rIndex][cIndex] = prevColValue + prevRowValue
            }
        }
    }
    return matrix[m-1][n-1]
}

console.log(UniquePaths(3,7))