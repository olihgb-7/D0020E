# D0020E
Project in Computer Science - SysML 2.0 Viewer in a Browser

[ParserDemo](https://olihgb-7.github.io/ParserDemo/ParserDemo.html)

## Object Definitions
Currently there are three types of objects, there's the GenericObject, the Part object and the Package object. The Part and Package objects extend the GenericObject and the plan is for all objects to extend the GenericObject, which contains functions that are universal for most object types.

GenericObject contains all of the important functions at the moment. Each instance of GenericObject has a name, a type which can only be Part or Package at the moment, a value isDefinition which shows if an object is a definition or a usage, an array with its children meaning objects which are contained within it, a parent meaning within what context the object exists within eg. a part within a package would have the package as parent, a graphObject which is detailed within the Graphical Representation documentation and a variable instanceOf which determines what definition a usage is specified by.

The Part and Package classes don't contain any additional functionality at the moment however the idea was to keep any part or package specific functionality within these classes and all common or general functions within the GenericObject class.

The objects are created when the parse handler runs through the output from the parser. The parse handler then creates objects based on the input and puts all the objects into the SYSML_OBJECTS array and the highest level objects into the TOP_LEVEL_OBJECTS array. The TOP_LEVEL_OBJECTS array is used for drawing the diagram and is detailed within the Graphical Representation documentation.

For future development, more and more object definitions are gonna have to be created and the GenericObject needs to be expanded with more functionalities. We created a class diagram that contains the plans we had for the rest of the functions from SysML v2 at the time of this project. This class diagram was created to the best of our ability and our understanding of SysML v2 however due to time constraints we cannot guarantee that what the class diagram contains is perfect as our understanding of SysML v2 could very well have flaws.
