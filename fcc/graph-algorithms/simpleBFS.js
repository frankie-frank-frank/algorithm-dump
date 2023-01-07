/**
 * Iterative only
 * @param NodeList N
 * @param sourceNode source
 */

function BFS_Iter(N, source){
    const queue = [ source ]
    while(queue.length > 0){
        const current = queue.shift();
        console.log(current);
        for (let neighbor of gaph[current]){
            queue.push(neighbor)
        }
    }
}