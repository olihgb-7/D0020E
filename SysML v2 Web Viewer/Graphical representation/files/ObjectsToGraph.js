
/**
 * Test function will remove
 * @param {container} container usually a div, required for making a graph
 */
function loopTopLevelArray(){
    
    for(var j = 0; j < TOP_LEVEL_OBJECTS.length; j++){
         interpretObject(TOP_LEVEL_OBJECTS[j]);
    }
    /*
    var testobject = new Part("what", "the", true, null);
    var testobject2 = new Part("2", "the", true, testobject);
    var testobject3 = new Part("3", "the", true, testobject);
    var testobject4 = new Part("4", "the", true, testobject2);
    testobject.addChild(testobject2);
    testobject.addChild(testobject3);
    testobject2.addChild(testobject4);
    console.log(testobject);
    interpretObject(testobject);*/
}

/**
 * Recieves an object and creates a vertexObject and draws this object on the sysmlGraph, if 
 * the objects has children in the children array, also draws all children inside the object.
 * @param {GenericObject*} object Can be any object that extends GenericObject
 */
function interpretObject(object){
    var parent;
    try {
        parent = object.parent.graphObject;
        
    }
    catch{
        parent = null;
    }
    var test = drawObject(sysmlGraph, parent, object.name, 100, 80);
    object.setGraphObject(test);

    if(object.children.length != 0){
        for(var i = 0; i < object.children.length; i++){
            interpretObject(object.children[i]);
        }
    }
}