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

// Program starts here. Creates a sample graph in the
// DOM node with the specified ID. This function is invoked
// from the onLoad event handler of the document (see below).
function main(container)
{
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported())
    {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        var graph = new mxGraph(container);
        graph.setConnectable(true);
        
        // Enables connect preview for the default edge style
        graph.connectionHandler.createEdgeState = function(me)
        {
            var edge = graph.createEdge(null, null, null, null, null);
            
            return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
        };
        
        // Specifies the default edge style
        graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
        
        // Enables rubberband selection
        new mxRubberband(graph);
        
        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();
                        
        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        try
        {
            var v1 = graph.insertVertex(parent, null, 'test1', 100, 20, 100, 70, 'ROUNDED;strokeColor=red;fillColor=orange');

            var v2 = graph.insertVertex(parent, null, 'test2', 300, 150, 200, 200);
            
            
            var e1 = graph.insertEdge(parent, null, '', v1, v2);
            
        
        }
        finally
        {
            // Updates the display
            graph.getModel().endUpdate();
        }
    }
};

function addObject(graph, name, posx, posy){
    var parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try{
        var v1 = graph.insertVertex(parent, null, name, posx, posy, 100, 70);
    }
    finally{
        graph.getModel().endUpdate();
    }
    return v1;
}

function drawEdge(graph, v1, v2){
    var parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try{
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
    }
    finally{
        graph.getModel().endUpdate();
    }
}

function createGraph(container){
    // Creates the graph inside the given container
    var graph = new mxGraph(container);
    graph.setConnectable(false);
    return graph;
}
function test(){
    console.log("hello");
}