const figlet = require('figlet');
const chalk = require('chalk');
const clui = require('clui');
const replace = require('replace-in-file');
const spinner = clui.Spinner;
const progress = new spinner('\ncloning repo...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

const {
    exec
} = require('child_process');
const config = {
    name: 'Express Marko Generator',
    version: "1.0.0"
};
const log = console.log;
const repoUrl = `https://github.com/SandeepVattapparambil/express-marko.git`;
var drawLogo = new Promise(function (resolve, reject) {
    figlet(config.name, function (err, data) {
        if (err) {
            log(chalk.red('logo rendering failed!'));
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
            const gitCommand = `git clone ${repoUrl} ${folderName}`;
            progress.start();
            progress.message('cloning repo...');
            let clone = exec(gitCommand, function (err, data) {
                if (err) {
                    log(chalk.red.bold(err));
                    process.exit();
                }
            });
            clone.on('close', function (code) {
                progress.stop();
                log(chalk.green(`\nProject files downloaded successfully.`));
                let packageFiles = {
                    files: [`${folderName}/package.json`, `${folderName}/package-lock.json`],
                    from: 'experiment',
                    to: `${folderName}`
                };
                let serverFile = {
                    files: [`${folderName}/bin/server.js`],
                    from: 'experiment',
                    to: `${folderName}`
                };
                let configFiles = {
                    files: [`${folderName}/config/pino.js`, `${folderName}/config/lasso.js`],
                    from: 'Express Marko',
                    to: `${folderName}`
                };
                replace(packageFiles, (error, changes) => {
                    if (error) {
                        return console.error('Error occurred:', error);
                    }
                });
                replace(serverFile, (error, changes) => {
                    if (error) {
                        return console.error('Error occurred:', error);
                    }
                });
                replace(configFiles, (error, changes) => {
                    if (error) {
                        return console.error('Error occurred:', error);
                    }
                    log(chalk.green(`Project customizations completed succesfully.`));
                    log(chalk.green(`Project -> ${folderName} created succesfully.`));
                });
            });
        });
    } else {
        log(chalk.blue(`\nUsage:`));
        log(chalk.blue(`\express-marko-generator <project-name>`));
    }
}