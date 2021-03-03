function main2(container){
    createGraph(container);
    var testobject = new Part("what", "the", true, null);
    interpretObject(testobject);

    var testobject2 = new Part("?", "the", true, testobject);
    interpretObject(testobject2);

    var testobject3 = new Part("??", "the", true, testobject2);
    interpretObject(testobject3);

    var testobject4 = new Part("???", "the", true, testobject3);
    interpretObject(testobject4);

    var testobject5 = new Part("?", "the", true, testobject4);
    interpretObject(testobject5);

    var testobject6 = new Part("??", "the", true, testobject5);
    interpretObject(testobject6);

    var testobject7 = new Part("???", "the", true, testobject6);
    interpretObject(testobject7);
    /*
    createGraph(container);
    var parent = sysmlGraph.getDefaultParent();
    var v1 = addObject(sysmlGraph, parent, 'test1', 100, 80);

    var v2 = addObject(sysmlGraph, parent, 'test2', 300, 80);

    drawEdge(sysmlGraph, v1, v2);
    test();
    */
}



function interpretObject(object){
    var parent;
    try {
        parent = object.parent.graphObject;
    }
    catch{
        parent = null;
    }
    var test = addObject(sysmlGraph, parent, object.name, 100, 80);
    object.setGraphObject(test);
}