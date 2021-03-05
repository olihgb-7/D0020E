// Overridden to define per-shape connection points
mxGraph.prototype.getAllConnectionConstraints = function(terminal, source)
{
    if (terminal != null && terminal.shape != null)
    {
        if (terminal.shape.stencil != null)
        {
            if (terminal.shape.stencil.constraints != null)
            {
                return terminal.shape.stencil.constraints;
            }
        }
        else if (terminal.shape.constraints != null)
        {
            return terminal.shape.constraints;
        }
    }

    return null;
};

// Defines the default constraints for all shapes
mxShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
                                    new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                                    new mxConnectionConstraint(new mxPoint(0.75, 0), true),
                                    new mxConnectionConstraint(new mxPoint(0, 0.25), true),
                                    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
                                    new mxConnectionConstraint(new mxPoint(0, 0.75), true),
                                    new mxConnectionConstraint(new mxPoint(1, 0.25), true),
                                    new mxConnectionConstraint(new mxPoint(1, 0.5), true),
                                    new mxConnectionConstraint(new mxPoint(1, 0.75), true),
                                    new mxConnectionConstraint(new mxPoint(0.25, 1), true),
                                    new mxConnectionConstraint(new mxPoint(0.5, 1), true),
                                    new mxConnectionConstraint(new mxPoint(0.75, 1), true)];

// Edges have no connection points
mxPolyline.prototype.constraints = null;


/**
 * drawObject creates a vertex from mxGraph based on the input, returns this vertex as an object
 * @param {graphObject} graph a graph object which can be created using createGraph()
 * @param {graphObject} parent can be a graph object or default parent
 * @param {String} name name for vertex
 * @param {Int} posx position on x-axis
 * @param {Int} posy position on y-axis
 */
function drawObject(graph, parent, name, sizex, sizey){

    if (parent == null){
        parent = graph.getDefaultParent();
    }

    graph.getModel().beginUpdate();
    try{
        var v1 = graph.insertVertex(parent, null, name, 0, 0, sizex, sizey);
        layout.execute(parent);
    }
    finally{
        graph.getModel().endUpdate();
    }
    return v1;
}

/**
 * Draws an edge between two vertexes inside a graph
 * @param {graphObject} graph a graph object which can be created using createGraph()
 * @param {vertexObject} v1 a vertex object which can be created and drawn using addObject()
 * @param {vertexObject} v2 a vertex object which can be created and drawn using addObject()
 */
function drawEdge(graph, v1, v2){
    var parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try{
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
        layout.execute(parent);
    }
    finally{
        graph.getModel().endUpdate();
    }
}

//Vital global variable that represents the graph that we draw everything in
var sysmlGraph;
var layout;
var layout2;


/**
 * Creates a graphObject using a container(usually a div)
 * @param {container} container 
 */
function createGraph(container){
    // Creates the graph inside the given container
    sysmlGraph = new mxGraph(container);
    sysmlGraph.setConnectable(false);
    layout = new mxHierarchicalLayout(sysmlGraph, mxConstants.DIRECTION_NORTH);
    layout2 = new mxHierarchicalLayout(sysmlGraph, mxConstants.DIRECTION_NORTH);
}