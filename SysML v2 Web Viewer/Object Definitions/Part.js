class Part extends GenericObject {

    createConnection(v){
        this.v = v;
    }
}

var test = new Part("what", "the", true, "fuck");

console.log(test.getName());
console.log(test.getObjectType());
console.log(test.getParent());

