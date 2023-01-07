/*
    this activity check if it is possible to visit a node in a given directed graph, starting from a particular index
*/

//DFS solution
function hasPath_DFS(graph, src, dest){
    if(src === dest) return true;

    for (let neighbor of graph[src]){
        //recursive guard
        if(hasPath(graph, neighbor, dest) === true){
            return true;
        }
    }

    return false;
}

//BFS solution
function hasPath_BFS(graph, src, dest){
    const queue = [src]

    while(queue.length > 0){
        const current = queue.shift();
        if(current === dest) return true;

        for (let neighbor of graph[current]){
            queue.push(neighbor)
        }
    }

    return false; 
}