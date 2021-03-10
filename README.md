# D0020E
Project in Computer Science - SysML 2.0 Viewer in a Browser

[ParserDemo](https://olihgb-7.github.io/ParserDemo/ParserDemo.html)

## Object Definitions
Currently there are three types of objects, there's the GenericObject, the Part object and the Package object. The Part and Package objects extend the GenericObject and the plan is for all objects to extend the GenericObject, which contains functions that are universal for most object types.

GenericObject contains all of the important functions at the moment. Each instance of GenericObject has a name, a type which can only be Part or Package at the moment, a value isDefinition which shows if an object is a definition or a usage, an array with its children meaning objects which are contained within it, a parent meaning within what context the object exists within eg. a part within a package would have the package as parent, a graphObject which is detailed within the Graphical Representation documentation and a variable instanceOf which determines what definition a usage is specified by.

The Part and Package classes don't contain any additional functionality at the moment however the idea was to keep any part or package specific functionality within these classes and all common or general functions within the GenericObject class.

The objects are created when the parse handler runs through the output from the parser. The parse handler then creates objects based on the input and puts all the objects into the SYSML_OBJECTS array and the highest level objects into the TOP_LEVEL_OBJECTS array. The TOP_LEVEL_OBJECTS array is used for drawing the diagram and is detailed within the Graphical Representation documentation.

For future development, more and more object definitions are gonna have to be created and the GenericObject needs to be expanded with more functionalities. We created a class diagram that contains the plans we had for the rest of the functions from SysML v2 at the time of this project. This class diagram was created to the best of our ability and our understanding of SysML v2 however due to time constraints we cannot guarantee that what the class diagram contains is perfect as our understanding of SysML v2 could very well have flaws.

## Graphical Represenation
For drawing the graph, the library mxGraph is used. To make a graph in mxGraph we first need to make a graph object, which we accomplish using our function createGraph which takes a container, in our case a div, as an argument and then creates the graph object sysmlGraph. The object sysmlGraph is global so we can reach it from anywhere. We need to use the graph object when we want to draw our objects.

To draw objects on the graph we made a function drawObject which takes a graph object, a parent and a name as its arguments. We call this function from another function interpretObject which only takes an object as its argument and then calls drawObject after determining the objects parent and name. The function drawObject returns what we call a vertexObject which is the object for the drawing in the graph. After returning the vertexObject we store it in the variable graphObject in the original object to have a way to access it when drawing edges and/or nestled objects.

The interpretObject function is called from the function loopTopLevelArray which loops through the array TOP_LEVEL_OBJECTS and calls the interpretObject function for every object within the array. The interpretObject function then recursively draws all objects by calling itself for every child in every object. interpretObject also checks if a part is nestled wihtin a part and if they are, it draws arrows between them instead of drawing the child part inside the parent part, this tries to emulate how the eclipse extenstion draws nestled parts however this functionality isn't fully developed yet and will need to be expanded.

For future development, more types of sysml objects will need to be made possible to draw as currently only part and package types are supported, and even these aren't fully developed yet. No information about the objects are drawn other than the name and in what context it exists. Drawing nestled objects is very wonky and objects are drawn on top of eachother. Arrows are not used except in one specific case. More different types of arrows and boxes have to be implemented to support sysml diagrams. Some kind of algorithm for placement of the drawn objects needs to be developed, either through some built in mxGraph function or a whole new one.
