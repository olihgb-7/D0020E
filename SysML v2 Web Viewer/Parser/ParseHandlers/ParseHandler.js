// NOTE: The code below in the comment block is for Node.js testing
/*
var Parser = require('../SysmlParser.js');
var GenericObject = require('../../Object Definitions/GenericObject.js');
var PackageObject = require('../../Object Definitions/Package.js');
var PartObject = require('../../Object Definitions/Part.js');

var fs = require('fs');
var filePath = require.resolve('../ParserTestCases/sysmlTest-1.sysml');
var fileContent = fs.readFileSync(filePath,'utf8');
*/

var SYSML_OBJECTS = [];         // SysML Objects saved directly to an array     NOTE: MOSTLY USED FOR DEBUGGING, SHOULD NOT BE USED IN DEVELOPMENT
var TOP_LEVEL_OBJECTS = [];     // SysML Objects saved in a nested array        NOTE: SHOULD BE USED IN DEVELOPMENT

/**
 * Prints the results of parsing some input
 * NOTE: THIS SHOULD BE REWRITTEN TO A RECURSIVE FUNCTION!
 *       THIS ONLY GOES DOWN THREE LEVELS!   
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


/* 
 * Creates Object Definitions based on parser input in a recursive manner
 * @param {*} parseResult - The output from a parser that should be translated to SysML Objects
 * @param {*} parent - The parent of the parsed content. Should be set to null when invoking method! 
 */
function createObjects(parseResult, parent) {

    // Go trough every object on the current depth level
    for (var i = 0; i < parseResult.length; i++) {

        // Debug message to make sure that the recursive function is running, not essential...
        if (parent === null && i === 0) {
            console.log("RECURSIVE createObjects METHOD IS RUNNING!");
        }

        var tempParent = parent;

        // Make sure that the object is actaully defined
        if (parseResult[i] !== undefined) {

            // Decision on what type of object should be created. Based on the parseResult.type
            // Extend here with new cases when implementing new SysML objects!
            switch (parseResult[i].type) {
                case 'PackageClass':
                    var packageObj = new Package(parseResult[i].name, parseResult[i].type, null, parent, null);
                    
                    // If object is top level --> Add to TOP_LEVEL_OBJECTS array
                    // Else --> Append object to child array of parents
                    // This creates the nested structure seen in TOP_LEVEL_OBJECTS 
                    if (tempParent === null) {
                        TOP_LEVEL_OBJECTS.push(packageObj);
                    }
                    else {
                        tempParent.addChild(packageObj);
                    }
                    
                    tempParent = packageObj;
                    break;
                case 'PartClass':

                    // Check if PartClass is a definition
                    if (parseResult[i].isDefinition) {
                        var partObj = new Part(parseResult[i].name, parseResult[i].type, true, parent, null);
                    }
                    else {
                        var partObj = new Part(parseResult[i].name, parseResult[i].type, false, parent, null)
                    }

                    // If object is top level --> Add to TOP_LEVEL_OBJECTS array
                    // Else --> Append object to child array of parents
                    // This creates the nested structure seen in TOP_LEVEL_OBJECTS 
                    if (tempParent === null) {
                        TOP_LEVEL_OBJECTS.push(partObj);
                    }
                    else {
                        tempParent.addChild(partObj);
                    }

                    tempParent = partObj;
                    break;
                default:
                    var genericObj = new GenericObject(parseResult[i].name, parseResult[i].type, null, parent, null);
                    
                    // If object is top level --> Add to TOP_LEVEL_OBJECTS array
                    // Else --> Append object to child array of parents
                    // This creates the nested structure seen in TOP_LEVEL_OBJECTS 
                    if (tempParent === null) {
                        TOP_LEVEL_OBJECTS.push(genericObj);
                    }
                    else {
                        tempParent.addChild(genericObj);
                    }

                    tempParent = genericObj;
                    break;
            }    
        }

        // Recursively call createObjects as long as the parseResult content is populated
        // Sends the parseResult content and its parent as parameters with the function call
        if (parseResult[i].content !== null) {
            createObjects(parseResult[i].content, tempParent);
        }
    }
}


/**
 * OLD CODE FOR ITERATIVELY CREATING SYSML OBJECTS FROM PARSING RESULTS
 * NOT IN USE - BUT LEAVING THIS CODE IN CASE THE RECURSION METHOD SHOULD BREAK
 * 
 * Creates Object Definitions based on parser input
 * NOTE: At the moment only a depth of 3 levels of nestled objects are supported!
 * @param {*} parseResult 
 */

 /*
function createObjects(parseResult) {

    // Top-level objects
    for (i = 0; i < parseResult.length; i++) {

        if (parseResult[i] !== undefined) {
            switch (parseResult[i].type) {
                case 'PackageClass':
                    var packageObj = new Package(parseResult[i].name, parseResult[i].type, null, null, null);
                    SYSML_OBJECTS.push(packageObj);
                    TOP_LEVEL_OBJECTS.push(packageObj);
                    break;
                case 'PartClass':

                    if (parseResult[i].isDefinition) {
                        var partObj = new Part(parseResult[i].name, parseResult[i].type, true, null, null);
                        SYSML_OBJECTS.push(partObj);
                        TOP_LEVEL_OBJECTS.push(partObj);
                    }
                    else {
                        var partObj = new Part(parseResult[i].name, parseResult[i].type, false, null, null)
                        SYSML_OBJECTS.push(partObj);
                        TOP_LEVEL_OBJECTS.push(partObj);
                    }
                    break;
                default:
                    var genericObj = new GenericObject(parseResult[i].name, parseResult[i].type, null, null, null);
                    SYSML_OBJECTS.push(genericObj);
                    TOP_LEVEL_OBJECTS.push(genericObj);
                    break;
            }    
        }

        // Second-level objects
        for (j = 0; j < parseResult[i].contentLength; j++) {

            if (parseResult[i].content[j] !== undefined) {

                switch (parseResult[i].content[j].type) {
                    case 'PackageClass':
                        var packageObj = new Package(parseResult[i].content[j].name, parseResult[i].content[j].type, null, TOP_LEVEL_OBJECTS[i], null);
                        SYSML_OBJECTS.push(packageObj);
                        TOP_LEVEL_OBJECTS[i].addChild(packageObj);
                        break;
                    case 'PartClass':

                        if (parseResult[i].content[j].isDefinition) {
                            var partObj = new Part(parseResult[i].content[j].name, parseResult[i].content[j].type, true, TOP_LEVEL_OBJECTS[i], null);
                            SYSML_OBJECTS.push(partObj);
                            TOP_LEVEL_OBJECTS[i].addChild(partObj);
                        }
                        else {
                            var partObj = new Part(parseResult[i].content[j].name, parseResult[i].content[j].type, false, TOP_LEVEL_OBJECTS[i], parseResult[i].content[j].instanceOf);
                            SYSML_OBJECTS.push(partObj);
                            TOP_LEVEL_OBJECTS[i].addChild(partObj);
                        }
                        break;
                    default:
                        var genericObj = new GenericObject(parseResult[i].content[j].name, parseResult[i].content[j].type, null, TOP_LEVEL_OBJECTS[i], null);
                        SYSML_OBJECTS.push(genericObj);
                        TOP_LEVEL_OBJECTS[i].addChild(genericObj);
                        break;
                } 
            }

            // Third-level objects
            for (k = 0; k < parseResult[i].content[j].contentLength; k++) {                

                if (parseResult[i].content[j].content[k] !== undefined) {

                    switch (parseResult[i].content[j].content[k].type) {
                        case 'PackageClass':
                            var packageObj = new Package(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, null, TOP_LEVEL_OBJECTS[i].children[j], null);
                            SYSML_OBJECTS.push(packageObj);
                            TOP_LEVEL_OBJECTS[i].children[j].addChild(packageObj);
                            break;
                        case 'PartClass':
        
                            if (parseResult[i].content[j].content[k].isDefinition) {
                                var partObj = new Part(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, true, TOP_LEVEL_OBJECTS[i].children[j], null);
                                SYSML_OBJECTS.push(partObj);
                                TOP_LEVEL_OBJECTS[i].children[j].addChild(partObj);
                            }
                            else {
                                var partObj = new Part(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, false, TOP_LEVEL_OBJECTS[i].children[j], parseResult[i].content[j].content[k].instanceOf);
                                SYSML_OBJECTS.push(partObj);
                                TOP_LEVEL_OBJECTS[i].children[j].addChild(partObj);
                            }
                            break;
                        default:
                            var genericObj = new GenericObject(parseResult[i].content[j].content[k].name, parseResult[i].content[j].content[k].type, null, TOP_LEVEL_OBJECTS[i].children[j], null);
                            SYSML_OBJECTS.push(genericObj);
                            TOP_LEVEL_OBJECTS[i].children[j].addChild(genericObj);
                            break;
                    } 
                }                
            }
        }
    }
}
*/