const getEdges = (idx, edge) => {
    const edges = [];
    for(let i = 0; i < edge.length; i++){
        if(idx === i) continue;
        if(edge[i] === 0) continue;
        edges.push(i);
    }
    console.log("Edges: " + edges);
    return edges;
};

const buildAdjList = (edges, n=edges.length) => {
    const adjList = Array.from({ length: n}, () => {return []});
    console.log(adjList)
    console.log(edges)
    for (let i = 0; i < edges.length; i++){
        adjList[i].push(...getEdges(i, edges[i]));
    }
    console.log(adjList)
    return adjList;
};

const dFs = (node, adjList, visited) => {
    console.log("DFS's visited object: " + JSON.stringify(visited));
    visited[node] = true;

    for(let neighbor of adjList[node]){
        if(!visited[neighbor]){
            visited[neighbor] = true;
            dFs(neighbor, adjList, visited);
        }
    }
}

const findCircleNum = function(isConnected){
    const adjList = buildAdjList(isConnected);
    const visited = {};
    let provinces = 0;

    for(let vertex = 0; vertex < adjList.length; vertex++) {
        if(!visited[vertex]){
            console.log("Visited: " + JSON.stringify(visited) + " provinces: " + provinces)
            provinces++;
            dFs(vertex, adjList, visited);
        }
    }
    console.log(provinces)
    return provinces;
}

findCircleNum([[1,1,0], [1,1,0], [0,0,1]]);