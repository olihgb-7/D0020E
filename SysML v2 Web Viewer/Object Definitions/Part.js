var GenericObject = require('./GenericObject.js');
class Part extends GenericObject {

    createConnection(v){
        this.v = v;
    }
}

module.exports = Part;