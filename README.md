# D0020E
Project in Computer Science - SysML 2.0 Viewer in a Browser


## General parser documentation
In this project we choose to implement a [parser generator](#Parser-generator) to build a fully functional [PEG parser](https://en.wikipedia.org/wiki/Parsing_expression_grammar). This generated parser (SysmlParser.js) is used to parse the .sysml files and creates JavaScript objects of the parsed result. The parser is then deployed in a [parse handler](#Parse-handler) (ParseHandler.js) together with predefined SysML object definitions (defined in their own JavaScript files in the "SysML v2 Web Viewer/Object Definitions" folder) which creates SysML objects based on the parsed result and the predefined SysML object definitions. These SyML objects are then recursively saved to an objects array called `TOP_LEVEL_OBJECTS` which allows the use of pure JavaScript based SysML objects in other parts of the application. 

This procedure is illustrated in the figure below.

![ParserConnection](ParserConnection.png "Parser Connection Procedure")


## Parser generator
The parser generator used is a JavaScript based parser generator called [PEG.js](https://pegjs.org/). PEG.js works by generating a parser (SysmlParser.js) from grammar rules implemented in a .pegjs document (Grammar.pegjs) that describes expected input and can specify what the parser returns. This means that there is no need to write an actual parser, only the grammatical rule sets that the expected input should conform by.

The two main ways to work with the parser generator used in this project were:

- Using the provided [Online Tool](https://pegjs.org/online) on the PEG.js website (*Not recommended*)
- Installing the [Node.js Extension](https://pegjs.org/documentation) (*Requires installation of [Node.js](https://nodejs.org/en/) beforehand*)

**NOTE:** *The Online Tool does **NOT** save any progress and has an ability to **CRASH AND WIPE OUT ALL PROGRESS**. Make sure to make regular backups if this approach is to be used!!*

### Generating parser using the Online Tool
Depending on if the parser that is generated should be used with pure JavaScript or with Node.js there are different values for the "Parser variable" that need to be set:

**Pure JavaScript:** Set "Parser variable" to: `window.PARSER`   
**Node.js:** Set "Parser variable" to: `module.exports`

### Generating parser using Node.js Extension
To generate a parser using this approach first [install Node.js](https://nodejs.org/en/) and then continue with the following [installation guide](https://pegjs.org/documentation#installation-node-js)!

Depending on if the parser that is generated should be used with pure JavaScript or with Node.js there are different flags in the `pegjs` command that needs to be set:

**Pure JavaScript:** Set the following flags: `--format globals -e window.PARSER`  
**Node.js:** No need to set any specific flags.


## Parse handler
The current state of the parse handler (ParseHandler.js) contains the following:

- A `createObjects(parseResult, parent)` function that recursively creates SysML objects and populates the `TOP_LEVEL_OBJECTS` array. The `TOP_LEVEL_OBJECTS` array only contains the SysML objects on the top level and the function then recursively populates each objects `children` arrays with its children 
- A global `TOP_LEVEL_OBJECTS` array that contains a nested structure of the SysML objects created by the `createObjects()` function

**Our interpritation of children and parents:**  
A child to a SysML object refers to any SysML object contained within its own code block. A parent is therefor the SysML object that another SysML object is contained within.  
Example:
```
package Package1 {                  <-- Parent: null       Children: OuterPart1, OuterPart2
    part def OuterPart1 {           <-- Parent: Package1   Children: InnerPart1
        part def InnerPart1 {...}   <-- Parent: OuterPart1 Children: ...
    }   
    part def OuterPart2 {           <-- Parent: Package1   Children: InnerPart2
        part def InnerPart2 {...}   <-- Parent: OuterPart2 Children: ...
    }
}
```

## Using the parser and parser handler

### Import parser and parse handler to HTML document
To be able to use the generated parser and the parse handler in HTML documents simply use the following HTML tags :
```html
<script type="text/javascript" src="../Parser/SysmlParser.js"></script>
<script type="text/javascript" src="../Parser/ParseHandlers/ParseHandler.js"></script>
``` 
**NOTE:** *The "src" file path might need to change depending on location of the HTML document that is trying to import the scripts*  
**NOTE:** *The order of the script imports matters*

### Parse result and populate TOP_LEVEL_OBJECTS array
To be able to parse the result and then populate the TOP_LEVEL_OBJECTS array that should be used for the SysML objects the following code should be executed (either in the same HTML document mentioned [Import parser and parse handler to HTML document](#Import-parser-and-parse-handler-to-HTML-document) in or in a separate JavaScript)

```javascript
parseResult = PARSER.parse("FILE TO BE PARSED");
createObjects(parseResult, null);
```
**NOTE:** *Note that the order of the function calls are important. The parser must first parse the .sysml file before populating the TOP_LEVEL_OBJECTS array via the `createObjects()` function*

Now the `TOP_LEVEL_OBJECTS` array should be populated with SysML objects and can be used as any regular JavaScript object array. 


## Useful links:
[A Guide to Parsing](https://tomassetti.me/guide-parsing-algorithms-terminology/)  
[Parsing in JavaScript](https://tomassetti.me/parsing-in-javascript/)  
[Wikipedia Entry on Parsing](https://en.wikipedia.org/wiki/Parsing)  
[Wikipedia Entry on PEG Parsers](https://en.wikipedia.org/wiki/Parsing_expression_grammar)  
[PEG.js Website](https://pegjs.org)  
[PEG.js Online Tool](https://pegjs.org/online)  
[PEG.js Documentation](https://pegjs.org/documentation)  
[PEG.js GitHub Repository](https://github.com/pegjs/pegjs)  
[PEG.js Example Rule Sets](https://github.com/pegjs/pegjs/tree/master/examples)
