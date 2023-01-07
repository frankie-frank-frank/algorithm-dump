/*
    this activity check if it is possible to visit a node in a given undirected graph, starting from a particular index
    //to traverse an undirected graph, create an adjacency list first
    consider edges: [
        [i, j],
        [k, i],
        [m, k],
        [k, l],
        [o, n]
    ]

    transforming it into an adjacency list becomes:
    graph: {
        i: [j, k],
        j: [i, k],
        k: [i, m, l, j],
        m: [k],
        l: [k],
        o: [n],
        n: [o]
    }

    cycles: o-n, i-k-j
*/

const undirectedPath = (edges, nodeA, nodeB) => {
    const graph = buildGraph(edges)
    return hasPath(graph, nodeA, nodeB, new Set())
}

function hasPath(graph, src, dest, visited){
    if(src === dest) return true;

    /*
    note that returning false from visited.has(src) does not affect the 'return false;' at the bottom of this code.
    this is because this is also protected by the 'recursive guard' and as such, its output is sanitized by its 
    parent
    */
    if (visited.has(src)) return false;
    
    visited.add(src);

    for(let neighbor of graph[src]){
        if(hasPath(graph, neighbor, dest) === true){
            return true;
        }
    }

    return false;
}

//adjacency list 
function buildGraph(edges){
    const graph = {}

    for(let edge of edges){
        const [a, b] = edge;
        if(!(a in graph)) graph[a] = []
        if(!(b in graph)) graph[b] = []

        graph[a].push(b);
        graph[b].push(a);
    }

    return graph;
}