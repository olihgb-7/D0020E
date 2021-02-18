
class GenericObject{
    /**
     * 
     * @param {string} name Name for object created
     * @param {string} type Object type eg. Part or package etc.
     * @param {boolean} isDefinition Is object a definition or usage
     * @param {string} parent The parent of the object
     */
    constructor(name, type, isDefinition, parent){
        this.name = name;
        this.type = type;
        this.isDefinition = isDefinition;
        this.children = [];
        this.parent = parent;
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

    addChild(child){
        this.children.push(child);
    }
}

module.exports = GenericObject;
