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

    if (!Array.isArray(content) || !content.length) {
        return {type: "PackageClass", name: name.join(''), content: null, contentLength: 0}
    }
    else {
        return {type: "PackageClass", name: name.join(''), content, contentLength: content.length}
    }
}

part_def_block = type:part_def_token _ name:NAME _ LB _ content:content RB {
    
    if (!Array.isArray(content) || !content.length) {
        return {type: "PartClass", isDefinition: true, name: name.join(''), content: null, contentLength: 0}
    }
    else {
        return {type: "PartClass", isDefinition: true, name: name.join(''), content, contentLength: content.length}
    }
}

part_usage = ref_token* _ type:part_token _ name:NAME _ ":" _ parent:NAME _ multi:MULTIPLICITY* _ (";" / (LB _ content:content RB)) {
    
    var multiArray = multi.join();
    var single = true;
    
    for (var i = 0; i < multiArray.length; i++) {
    	if (multiArray[i] === ".") {
            single = false;
            break;
        }
    }
    
    if (!Array.isArray(multi) || !multi.length) {
        return {type: "PartClass", isDefinition: false, name: name.join(''), parent: parent.join(''), multi: null, content: null, contentLength: 0}
    }
    else if(single) {
        var digit = multi[0][1]
        return {type: "PartClass", isDefinition: false, name: name.join(''), parent: parent.join(''), multi: digit.join(''), content: null, contentLength: 0}

    	
    }
    else {
    	var firstDigit = multi[0][1]
        var secondDigit = multi[0][2][0][1]
    	return {type: "PartClass", isDefinition: false, name: name.join(''), parent: parent.join(''), multi: firstDigit.join('') + ".." + secondDigit.join(''), content: null, contentLength: 0}
    }
}


// CONTENT TO BE PARSED
content = (semi:SEMI _ {return semi}									/
		   package_block:(package_block) _ {return package_block} 		/
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