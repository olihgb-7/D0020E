var Parser = require('../SysmlParser.js');
var GenericObject = require('../../Object Definitions/GenericObject.js');
var PackageObject = require('../../Object Definitions/Package.js');
var PartObject = require('../../Object Definitions/Part.js');

var fs = require('fs');
var filePath = require.resolve('../../../ParserDemo/sysmlTest.sysml');
var fileContent = fs.readFileSync(filePath,'utf8');

var SYSML_OBJECTS = [];

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

        if (parseResult[i] !== undefined) {
            switch (parseResult[i].type) {
                case 'PackageClass':
                    SYSML_OBJECTS.push(new PackageObject(parseResult[i].name, parseResult[i].type, null, null, null));
                    break;
                case 'PartClass':

                    if (parseResult[i].isDefinition) {
                        SYSML_OBJECTS.push(new PartObject(parseResult[i].name, parseResult[i].type, true, null, null));
                    }
                    else {
                        SYSML_OBJECTS.push(new PartObject(parseResult[i].name, parseResult[i].type, false, null, null));
                    }
                    break;
                default:
                    SYSML_OBJECTS.push(new GenericObject(parseResult[i].name, parseResult[i].type, null, null, null));
                    break;
            }    
        }

        for (j = 0; j < parseResult[i].contentLength; j++) {
            if (parseResult[i].content[j] !== undefined) {

                switch (parseResult[i].content[j].type) {
                    case 'PackageClass':
                        SYSML_OBJECTS.push(new PackageObject(parseResult[i].content[j].name, parseResult[i].content[j].type, null, parseResult[i].name, null));
                        break;
                    case 'PartClass':

                        if (parseResult[i].content[j].isDefinition) {
                            SYSML_OBJECTS.push(new PartObject(parseResult[i].content[j].name, parseResult[i].content[j].type, true, parseResult[i].name, null));
                        }
                        else {
                            SYSML_OBJECTS.push(new PartObject(parseResult[i].content[j].name, parseResult[i].content[j].type, false, parseResult[i].name, parseResult[i].content[j].instanceOf));
                        }
                        break;
                    default:
                        SYSML_OBJECTS.push(new GenericObject(parseResult[i].content[j].name, parseResult[i].content[j].type, null, parseResult[i].name, null));
                        break;
                } 
            }

            for (k = 0; k < parseResult[i].content[j].contentLength; k++) {
                if (parseResult[i].content[j].content[k] !== undefined) {

                    switch (parseResult[i].content[j].content[k].type) {
                        case 'PackageClass':
                            SYSML_OBJECTS.push(new PackageObject(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, null, parseResult[i].content[j].name, null));
                            break;
                        case 'PartClass':
        
                            if (parseResult[i].content[j].content[k].isDefinition) {
                                SYSML_OBJECTS.push(new PartObject(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, true, parseResult[i].content[j].name, null));
                            }
                            else {
                                SYSML_OBJECTS.push(new PartObject(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, false, parseResult[i].content[j].name, parseResult[i].content[j].content[k].instanceOf));
                            }
                            break;
                        default:
                            SYSML_OBJECTS.push(new GenericObject(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, null, parseResult[i].content[j].name, null));
                            break;
                    } 
                }                
            }
        }
    }
}

var parseResult = Parser.parse(fileContent);
//printParseResult(parseResult);
//console.log("\n\n\n");
createObjects(parseResult);

console.log(SYSML_OBJECTS);
