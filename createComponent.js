const yargs = require ('yargs');
const chalk = require ('chalk');
const fs = require('fs/promises');
const path = require('path');

const successChalk = chalk.green;
const errorChalk = chalk.red.bold;
const warningChalk = chalk.yellow.bgGray;

let defaultComponent = "";
let variant = "";

const argv = yargs
    .command(['create <filename> [filepath]', 'c'], 'Creates React Component template', {
        functional: {
            alias: "f",
            boolean: true
        },
        
        class: {
            alias: "s",
            boolean: true
        }
    }, (argv) => {        
        const defaultPath = `./src/components/${argv.filename}.js`;
        const thePath = path.resolve((argv.filepath) ? argv.filepath : defaultPath);

        if(argv.functional) {
            variant = "functional";
            defaultComponent =
                `import React from "react";
            
function ${argv.filename}() {
    return (
        <div>
            Some content
        </div>
    );
}
            
export default ${argv.filename};`;
        } else if (argv.class) {
            variant = "class";
            defaultComponent =
                `import React from "react";
            
class ${argv.filename} extends React.Component {
    render() {
        return (
            <div>
                Some content
            </div>
        );
    }
}     
     
export default ${argv.filename};`;
        }

        fs.writeFile(thePath, defaultComponent)
            .then(() => console.log(successChalk(`Your ${variant} Component has been successfully created`)))
            .catch(e => console.log(errorChalk("An error has occurred:", e)));
    })
    .demandCommand(1, (warningChalk("At least 1 command should be passed")))
    .argv;
