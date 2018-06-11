const figlet = require('figlet');
const chalk = require('chalk');
const clui = require('clui');
const spinner = clui.Spinner;
const progress = new spinner('\ncloning repo...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);

const {
    exec
} = require('child_process');
const config = {
    name: 'Express Marko Generator',
    version: "1.0.0"
};
const log = console.log;
const repoUrl = `https://github.com/SandeepVattapparambil/express-marko.git`;
const gitCommand = `git clone ${repoUrl}`;
var drawLogo = new Promise(function (resolve, reject) {
    figlet(config.name, function (err, data) {
        if (err) {
            log(chalk.red('Something went wrong...'));
            reject(err);
        }
        log(chalk.yellow.bold(data));
        log(chalk.blue(`v${config.version}`));
        resolve(generate());
    });
});

function generate() {
    if (process.argv[2]) {
        let folderName = process.argv[2];
        if (folderName.length < 4) {
            log(chalk.red.bold(`\nError: Use a valid project name with minimum 4 chars`));
            process.exit();
        }
        if (!folderName.match(/^[^\\/?%*:|"<>\.]+$/g)) {
            log(chalk.red.bold(`\nError: Project name cannot contain special chars`));
            process.exit();
        }
        exec(`git`, function (err, data) {
            if (!data) {
                log(chalk.red.bold(`\nError: Git is not installed`));
                process.exit();
            }
            progress.start();
            progress.message('\ncloning repo...');
            let clone = exec(gitCommand, function (err, data) {
                if (err) {
                    log(chalk.red.bold(err));
                    process.exit();
                }
            });
            clone.on('close', function(code){
                progress.stop();
                log(chalk.green(`\nProject files downloaded successfully.`));
            });
        });
    } else {
        log(chalk.blue(`\n[option]         [description]`));
        log(chalk.blue(` -v | --version     get version`));
        log(chalk.blue(`\nUsage:`));
        log(chalk.blue(`\express-marko-generator <project-name>`));
    }
}