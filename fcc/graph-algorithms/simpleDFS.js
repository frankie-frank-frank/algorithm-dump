/**
 * Iterative DFS
 * @param {Node List} N
 * @param {Source Node} source
 */

function DFS_Iter(N, source) {
    const stack = [source]
    while (stack.length > 0){
        const current = stack.pop()
        console.log(current)

        for(let neighbor of N[current]){
            stack.push(neighbor)
        }
    }
}

/**
 * Recursive DFS
 * @param {Node List} N 
 * @param {Source Node} source
 */
function DFS_Rec(N, source){
    console.log(source);
    for (let neighbor of N[source]){
        DFS_Rec(N, neighbor)
    }
}

const graph = {
    a: ['c', 'd'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
}

