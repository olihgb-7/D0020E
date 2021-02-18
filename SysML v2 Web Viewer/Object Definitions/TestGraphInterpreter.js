var Part = require('./Part.js');
var Package = require('./Package.js');
var test = new Part("1", "2", false, "3");
var test2 = new Package("0", "2", false, "3");
console.log(test.getName());
console.log(test2.getName());