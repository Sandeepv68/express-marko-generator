const figlet = require('figlet');
const chalk = require('chalk');
const {
    exec
} = require('child_process');
const config = {
    name: 'Express Marko Generator',
    version: "1.0.0"
};
const log = console.log;

if (process.argv[2]) {
    let folderName = process.argv[2];
    // exec(`mkdir ${folderName}`);
} else {
    figlet(config.name, function (err, data) {
        if (err) {
            log(chalk.red('Something went wrong...'));
            console.dir(err);
            return;
        }
        log(chalk.yellow.bold(data));
        log(chalk.blue(`v${config.version}`));
    });
}