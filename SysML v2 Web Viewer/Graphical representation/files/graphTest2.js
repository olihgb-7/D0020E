
function main2(container){
    var graph = createGraph(container);
    
    var v1 = addObject(graph, 'test1', 100, 80);

    var v2 = addObject(graph, 'test2', 300, 80);

    drawEdge(graph, v1, v2);
}