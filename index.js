/**
 * Express Marko Generator v1.0.3
 * A CLI tool to generate an Expressjs application with MarkoJS and MaterializeCSS framework.
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 * Website: www.sandeepv.in
 */

 /**
  * Figlet - render ASCII graphics in terminal
  */
const figlet = require('figlet');

/**
 * Chalk - colorful terminal logs
 */
const chalk = require('chalk');

/**
 * Clui - spinners and loaders in terminal
 */
const clui = require('clui');

/**
 * Replace-in-file - replace strings in files
 */
const replace = require('replace-in-file');

/**
 * Clui spinner instance
 */
const spinner = clui.Spinner;

/**
 * Custom progress message and spinner
 */
const progress = new spinner('\ncloning repo...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

/**
 * Exec command from child_process
 */
const {
    exec
} = require('child_process');

/**
 * Application configuration object
 */
const config = {
    name: 'Express Marko Generator',
    version: "1.0.3"
};

/**
 * Log - console.log instance
 */
const log = console.log;

/**
 * express-marko-generator github repository url
 */
const repoUrl = `https://github.com/SandeepVattapparambil/express-marko.git`;

/**
 * Promise object to draw and render logo ASCII
 */
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

/**
 * Application bootstrapping function
 */
function generate() {
    /**
     * process.argv[2] - command line arguments
     */
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
        /**
         * Check git is installed or not
         */
        exec(`git`, function (err, data) {
            if (!data) {
                log(chalk.red.bold(`\nError: Git is not installed`));
                process.exit();
            }
            const gitCommand = `git clone ${repoUrl} ${folderName}`;
            progress.start();
            progress.message('cloning repo...');
            /**
             * Clone repo
             */
            let clone = exec(gitCommand, function (err, data) {
                if (err) {
                    log(chalk.red.bold(err));
                    process.exit();
                }
            });
            /**
             * Customize project
             */
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