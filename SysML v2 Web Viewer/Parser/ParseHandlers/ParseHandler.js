var Parser = require('../SysmlParser.js');
var GenericObject = require('../../Object Definitions/GenericObject.js');
var PackageObject = require('../../Object Definitions/Package.js');
var PartObject = require('../../Object Definitions/Part.js');

var fs = require('fs');
var filePath = require.resolve('../../../ParserDemo/sysmlTest.sysml');
var fileContent = fs.readFileSync(filePath,'utf8');

/**
 * Prints the results of parsing some input
 * NOTE: At the moment only a depth of 3 levels of nestled objects are supported!
 * @param {} parseResult 
 */
function printParseResult(parseResult) {

    for (i = 0; i < parseResult.length; i++) {

        if (Array.isArray(parseResult[i].content)) {

            console.log("Level 0." + i + ":");
            console.log(parseResult[i]);
        }        

        for (j = 0; j < parseResult[i].content.length; j++) {

            if (Array.isArray(parseResult[i].content[j].content)) {

                console.log("Level 1." + j + ":");
                console.log(parseResult[i].content[j]);
            }
        }
    }
}

/**
 * Creates Object Definitions based on parser input
 * NOTE: At the moment only a depth of 3 levels of nestled objects are supported!
 * @param {*} parseResult 
 */
function createObjects(parseResult) {

    for (i = 0; i < parseResult.length; i++) {

        switch (parseResult[i].type) {
            case 'PackageClass':
                console.log(new PackageObject(parseResult[i].name, parseResult[i].type, null, null));
                break;
            case 'PartClass':

                if (parseResult[i].isDefinition) {
                    console.log(new PartObject(parseResult[i].name, parseResult[i].type, true, null));
                }
                else {
                    console.log(new PartObject(parseResult[i].name, parseResult[i].type, false, null));
                }
                break;
            default:
                console.log(new GenericObject(parseResult[i].name, parseResult[i].type, null, null));
                break;
        }    

        for (j = 0; j < parseResult[i].content.length; j++) {

            switch (parseResult[i].content[j].type) {
                case 'PackageClass':
                    console.log(new PackageObject(parseResult[i].content[j].name, parseResult[i].content[j].type, null, null));
                    break;
                case 'PartClass':

                    if (parseResult[i].content[j].isDefinition) {
                        console.log(new PartObject(parseResult[i].content[j].name, parseResult[i].content[j].type, true, null));
                    }
                    else {
                        console.log(new PartObject(parseResult[i].content[j].name, parseResult[i].content[j].type, false, parseResult[i].content[j].parent));
                    }
                    break;
                default:
                    console.log(new GenericObject(parseResult[i].content[j].name, parseResult[i].content[j].type, null, null));
                    break;
            } 
            console.log("\n LOOP j DONE!\n");
        }
        console.log("\n LOOP i DONE!\n");
    }
}

var parseResult = Parser.parse(fileContent);
//printParseResult(parseResult);
//console.log("\n\n\n");
createObjects(parseResult);
