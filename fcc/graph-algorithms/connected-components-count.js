/*
    (Check Capture2.PNG as a guide)
    this activity checks the number of unique connected graphs    
*/ 

function connectedComponentsCount(graph){
    const visited = new Set()
    let count = 0
    for (let node in graph){
        if(explore(graph, node, visited) === true) count +=1
    }
    return count;
}

function explore(graph, current, visited){
    if(visited.has(String(current))) return false;

    visited.add(String(current))

    for(let neighbor of graph[current]){
        explore(graph, neighbor)
    }

    //this only happens if you have explored all items in a component set
    return true;
}