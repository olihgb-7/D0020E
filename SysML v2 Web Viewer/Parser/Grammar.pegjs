/* 
!!!!!!!NOTE!!!!!!!!
DO NOT FALL INTO RECURSIVE PATTERNS!!!!

EXAMPLE:
                 ||                                                         ||                                                  ||
                 \/                                                         \/                                                  \/                 
part_def_block = ( type:part_def_token _ name:name _ b _ block:part_def_block* _ b {return {type, name: name.join(''), block}} )* 
*/

startRule = package_block*


// CODE DEFINITION RULES
package_block = type:package_token _ name:NAME _ LB _ content:content RB _ {

	var outputName;

	if (name[0] === "'") {
    	outputName = name[1].join('');
    }
    else {
    	outputName = name.join('');
    }

    if (!Array.isArray(content) || !content.length) {
        return {type: "PackageClass", name: outputName, content: null, contentLength: 0}
    }
    else {
        return {type: "PackageClass", name: outputName, content, contentLength: content.length}
    }
}

part_def_block = type:part_def_token _ name:NAME _ content:(SEMI / (LB _ content RB)) {  
    
    var outputName;

	if (name[0] === "'") {
    	outputName = name[1].join('');
    }
    else {
    	outputName = name.join('');
    }
    
    if (content[2] !== undefined && content[2].length) {
    
    	return {type: "PartClass", isDefinition: true, name: outputName, content: content[2], contentLength: content.length}
    }
    else {
    
    	return {type: "PartClass", isDefinition: true, name: outputName, content: null, contentLength: 0}
    }
}

part_usage = ref_token* _ type:part_token _ name:NAME _ ":" _ instanceOf:NAME _ multi:MULTIPLICITY* _ (SEMI / (LB _ content:content RB)) {
    
    var multiArray = multi.join();
    var single = true;
    var outputName;
    var outputInstanceOf;

	if (name[0] === "'") {
    	outputName = name[1].join('');
    }
    else {
    	outputName = name.join('');
    }
    
    if (instanceOf[0] === "'") {
    	outputInstanceOf = instanceOf[1].join('');
    }
    else {
    	outputInstanceOf = instanceOf.join('');
    }
    
    for (var i = 0; i < multiArray.length; i++) {
    	if (multiArray[i] === ".") {
            single = false;
            break;
        }
    }
    
    if (!Array.isArray(multi) || !multi.length) {
        return {type: "PartClass", isDefinition: false, name: outputName, instanceOf: outputInstanceOf, multi: null, content: null, contentLength: 0}
    }
    else if(single) {
        var digit = multi[0][1]
        return {type: "PartClass", isDefinition: false, name: outputName, instanceOf: outputInstanceOf, multi: digit.join(''), content: null, contentLength: 0}

    	
    }
    else {
    	var firstDigit = multi[0][1]
        var secondDigit = multi[0][2][0][1]
    	return {type: "PartClass", isDefinition: false, name: outputName, instanceOf: instanceOf.join(''), multi: firstDigit.join('') + ".." + secondDigit.join(''), content: null, contentLength: 0}
    }
}


// CONTENT TO BE PARSED
content = (package_block:(package_block) _ {return package_block} 		/
		   part_def_block:(part_def_block) _ {return part_def_block} 	/ 
           part_usage:(part_usage) _ {return part_usage})*


//TOKENS
package_token = "package"
part_def_token = "part def"
part_token = "part"
ref_token = "ref"


// BASE RULES
MULTIPLICITY = "[" [0-9]* (".." [0-9]*)* "]"
LB = "{"
RB = "}"
SEMI = ";"
NAME = ("'" [a-zA-Z0-9 ]+ "'") / [a-zA-Z0-9]+
_ "whitespaces" = [ \n\r\t]*