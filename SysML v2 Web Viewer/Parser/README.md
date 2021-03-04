# D0012E - Parser code

To generate the correct parser via the PEG.JS parser generator run the following command in a terminal located in the same folder where Grammar.pegjs is located:

`pegjs --format globals -e window.PARSER -o SysmlParser.js Grammar.pegjs`
