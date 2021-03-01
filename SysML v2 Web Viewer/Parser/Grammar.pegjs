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
package_block = type:package_token _ name:name _ LB _ content:content RB _ {

    if (!Array.isArray(content) || !content.length) {
        return {type: "PackageClass", name: name.join(''), content: null}
    }
    else {
        return {type: "PackageClass", name: name.join(''), content}
    }
}

part_def_block = type:part_def_token _ name:name _ (";" / (LB _ content:content RB)) {
 	
    if (!Array.isArray(content) || !content.length) {
        return {type: "PartClass", isDefinition: true, name: name.join(''), content: null}
    }
    else {
        return {type: "PartClass", isDefinition: true, name: name.join(''), content}
    }
}

part_usage = ref_token* _ type:part_token _ alias:name _ ":" _ parent:name _ multi:multiplicity* _ (";" / (LB _ content:content RB)) {
    
    var multiArray = multi.join();
    var single = true;
    
    for (var i = 0; i < multiArray.length; i++) {
    	if (multiArray[i] === ".") {
            single = false;
            break;
        }
    }
    
    if (!Array.isArray(multi) || !multi.length) {
        return {type: "PartClass", isDefinition: false, alias: alias.join(''), parent: parent.join(''), multi: null}
    }
    else if(single) {
        var digit = multi[0][1]
        return {type: "PartClass", isDefinition: false, alias: alias.join(''), parent: parent.join(''), multi: digit.join('')}

    	
    }
    else {
    	var firstDigit = multi[0][1]
        var secondDigit = multi[0][2][0][1]
    	return {type: "PartClass", isDefinition: false, alias: alias.join(''), parent: parent.join(''), multi: firstDigit.join('') + ".." + secondDigit.join('')}
    }
}


// CONTENT TO BE PARSED
content = (package_block:(package_block) _ {return package_block} /
		  part_def_block:(part_def_block) _ {return part_def_block} / 
          part_usage:(part_usage) _ {return part_usage})*


//TOKENS
package_token = "package"
part_def_token = "part def"
part_token = "part"
ref_token = "ref"



// BASE RULES
multiplicity = "[" [0-9]* (".." [0-9]*)* "]"
LB = "{"
RB = "}"
name = ("'" [a-zA-Z0-9 ]+ "'") / [a-zA-Z0-9]+
code_block = [a-zA-Z0-9 \n\r\t]*
_ "whitespaces" = [ \n\r\t]*