const yargs = require ('yargs');
const chalk = require ('chalk');
const fs = require('fs/promises');
const path = require('path');

const successChalk = chalk.green;
const errorChalk = chalk.red.bold;
const warningChalk = chalk.yellow.bgGray;

const argv = yargs
    .command(['create <filename> [filepath]', 'c'], 'Creates React Component template', {
        functional: {
            alias: "f",
            boolean: true
        }
    }, (argv) => {
        if(argv.functional) {
            console.log(successChalk("Functional Component starts"))
        }
        const defaultPath = `./src/components/${argv.filename}.js`;
        const thePath = path.resolve((argv.filepath) ? argv.filepath : defaultPath);
        const defaultFuncComponent =
`import React from "react";
            
function ${argv.filename}() {
    return (
        <div>
            Some content
        </div>
    );
}
            
export default ${argv.filename};`;

        fs.writeFile(thePath, defaultFuncComponent)
            .then(() => console.log(successChalk("Your Component has been successfully created")))
            .catch(e => console.log(errorChalk("An error has occurred:", e)));
    })
    .demandCommand(1, (warningChalk("At least 1 command should be passed")))
    .argv;
