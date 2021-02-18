
class GenericObject{
    /**
     * 
     * @param {string} name Name for object created
     * @param {string} type Object type eg. Part or package etc.
     * @param {boolean} isDefinition Is object a definition or usage
     */
    constructor(name, type, isDefinition){
        this.name = name;
        this.type = type;
        this.isDefinition = isDefinition;
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
}