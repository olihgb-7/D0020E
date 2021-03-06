/* 
!!!!!!!NOTE!!!!!!!!
DO NOT FALL INTO RECURSIVE PATTERNS!!!!

EXAMPLE:
                 ||                                                         ||                                                  ||
                 \/                                                         \/                                                  \/                 
part_def_block = ( type:part_def_token _ name:name _ b _ block:part_def_block* _ b {return {type, name: name.join(''), block}} )* 

*/

startRule = package_block

// CODE DEFINITION RULES
package_block = type:package_token _ name:name _ b _ content:content* b {

    if (!Array.isArray(content) || !content.length) {
        return {type: "Package", name: name.join(''), content: null}
    }
    else {
        return {type: "Package", name: name.join(''), content}
    }
}

part_def_block = type:part_def_token _ name:name _ b _ content:content* b {
 	
    if (!Array.isArray(content) || !content.length) {
        return {type: "PartDef", name: name.join(''), content: null}
    }
    else {
        return {type: "PartDef", name: name.join(''), content}
    }
}

part_usage = type:part_token _ alias:name _ ":" _ parent:name ";" {
    
    return {type: "PartUsage", alias: alias.join(''), parent: parent.join('')}
}


// CONTENT TO BE PARSED
content = def:(part_def_block) _ {return def} / 
          usage:(part_usage) _ {return usage}


//TOKENS
package_token = "package"
part_def_token = "part def"
part_token = "part"


// BASE RULES
b = "{" / "}"
name = ("'" [a-zA-Z0-9 ]+ "'") / [a-zA-Z0-9]+
code_block = [a-zA-Z0-9 \n\r\t]*
_ "whitespaces" = [ \n\r\t]*