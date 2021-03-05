class GenericObject{
    /**
     * 
     * @param {string} name Name for object created
     * @param {string} type Object type eg. Part or package etc.
     * @param {boolean} isDefinition Is object a definition or usage
     * @param {string} parent The parent of the object. At the moment a parent is classified as a container object a level above
     * @param {string} instanceOf The object that another object is an instance of
     */
    constructor(name, type, isDefinition, parent, instanceOf){
        this.name = name;
        this.type = type;
        this.isDefinition = isDefinition;
        this.children = [];
        this.parent = parent;
        this.graphObject;
        this.instanceOf = instanceOf;
    }
    getName(){
        return this.name;
    }

    getObjectType() {
        return this.type;
    }

    getIsDefinition(){
        return this.isDefinition;
    }

    getParent(){
        return this.parent
    }

    getInstanceOf(){
        return this.instanceOf;
    }

    addChild(child){
        this.children.push(child);
    }

    setGraphObject(object){
        this.graphObject = object;
    }
}

/*
module.exports = GenericObject;  // TODO: REMOVE WHEN DONE WITH Node.js TESTING!!!
*/