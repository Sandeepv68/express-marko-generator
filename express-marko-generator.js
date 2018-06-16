/**
 * Express Marko Generator v2.0.1
 * A CLI tool to generate an ExpressJS application with MarkoJS and MaterializeCSS framework.
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 * Website: www.sandeepv.in
 */

/**
 * async - utilities library for async operations
 */
const async = require('async');

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
 * Function to Spawns a shell then executes the command within that shell, buffering any generated output. 
 * The command string passed to the exec function is processed directly by the shell and special 
 * characters (vary based on shell) need to be dealt with accordingly.
 * Note: Never pass unsanitized user input to this function. 
 * Any input containing shell metacharacters may be used to trigger arbitrary command execution.
 */
const {
    exec
} = require('child_process');

/**
 * Application configuration object
 */
const config = {
    name: 'Express Marko Generator',
    version: '2.0.1'
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
 * Bootstrap the generator after rendering the logo
 */
figlet(config.name, (err, data) => {
    if (err) {
        log(chalk.red('logo rendering failed!: ', err));
    }

    /**
     * render the logo in bold yellow and version in blue
     */
    log(chalk.yellow.bold(data));
    log(chalk.blue(`v${config.version}`));

    /**
     * check the args[] of process for parameters and then initiate the generator or else log the help.
     */
    if (process.argv[2]) {
        /**
         * get the argument passed as the project name.
         */
        let projectName = process.argv[2];

        /**
         * validate the name
         */
        if (projectName.length < 4) {
            log(chalk.red.bold(`\nError: Use a valid project name with minimum 4 chars`));
            process.exit();
        }
        if (!projectName.match(/^[^\\/?%*:|"<>\.]+$/g)) {
            log(chalk.red.bold(`\nError: Project name cannot contain special chars`));
            process.exit();
        }

        /**
         * Check whether git is installed or not and continue.
         */
        let checkGit = `git`;
        exec(checkGit, (data) => {
            if (!data) {
                log(chalk.red.bold(`\nError: Git is not installed`));
                process.exit();
            }

            /**
             * Clone repo
             */
            const gitCommand = `git clone ${repoUrl} ${projectName}`;
            //Start progress bar
            progress.start();
            //Set progress message
            progress.message('cloning repo...');
            let clone = exec(gitCommand, (err) => {
                if (err) {
                    log(chalk.red.bold(err));
                    process.exit();
                }
            });

            /**
             * Customize project once clone is complete.
             * ie, when clone command emits 'close' event.
             */
            clone.on('close', () => {
                //Stop progress bar
                progress.stop();
                log(chalk.green(`\nProject files downloaded successfully.`));
                if (isWindows) {
                    /**
                     * Cleanup project folder in WINDOWS.
                     */
                    exec(`rmdir ${projectName}\\.git /s /q`, (err) => {
                        if (err) {
                            log(chalk.red.bold(`\nError removing .git folder, ${err}`));
                        }
                    });
                    exec(`rmdir ${projectName}\\.github /s /q`, (err) => {
                        if (err) {
                            log(chalk.red.bold(`\nError removing .git folder, ${err}`));
                        }
                    });
                    exec(`del ${projectName}\\CODE_OF_CONDUCT.md /s /q`, (err) => {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                    exec(`del ${projectName}\\PULL_REQUEST_TEMPLATE.md /s /q`, (err) => {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                    exec(`del ${projectName}\\CONTRIBUTING.md /s /q`, (err) => {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                    exec(`del ${projectName}\\LICENSE /s /q`, (err) => {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                } else {
                    /**
                     * Cleanup in unix, mac, linux
                     */
                    exec(`rm ${projectName}/.git`, function (err) {
                        if (err) {
                            log(chalk.red.bold(`\nError removing .git folder, ${err}`));
                        }
                    });
                    exec(`rm ${projectName}/.github`, function (err) {
                        if (err) {
                            log(chalk.red.bold(`\nError removing .git folder, ${err}`));
                        }
                    });
                    exec(`del ${projectName}/CODE_OF_CONDUCT.md`, function (err) {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                    exec(`del ${projectName}/PULL_REQUEST_TEMPLATE.md`, function (err) {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                    exec(`del ${projectName}/CONTRIBUTING.md`, function (err) {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                    exec(`del ${projectName}/LICENSE`, function (err) {
                        if (err) {
                            log(chalk.red.bold(`\nError cleaning up the project, ${err}`));
                        }
                    });
                }
                let packageFiles = {
                    files: [`${projectName}/package.json`, `${projectName}/package-lock.json`],
                    from: 'experiment',
                    to: `${projectName}`
                };
                let serverFile = {
                    files: [`${projectName}/bin/server.js`],
                    from: 'experiment',
                    to: `${projectName}`
                };
                let configFiles = {
                    files: [`${projectName}/config/pino.js`, `${projectName}/config/lasso.js`],
                    from: 'Express Marko',
                    to: `${projectName}`
                };
                async.parallel({
                    replacePackageFiles: function (callback) {
                        replace(packageFiles, (error) => {
                            if (error) {
                                return console.error('Error occurred:', error);
                            }
                        });
                        callback(null, `Package files customized.`);
                    },
                    replaceServerFile: function (callback) {
                        replace(serverFile, (error) => {
                            if (error) {
                                return console.error('Error occurred:', error);
                            }
                        });
                        callback(null, `Server file configured.`);
                    },
                    replaceConfigFiles: (callback) => {
                        replace(configFiles, (error) => {
                            if (error) {
                                return console.error('Error occurred:', error);
                            }
                        });
                        callback(null, `Configuration files customized.`);
                    }
                }, (err, results) => {
                    if (results) {
                        log(chalk.green(`Project customizations completed succesfully.`));
                        log(chalk.green(`Project -> ${projectName} created succesfully.`));
                    }
                });
            });
        });
    } else {
        log(chalk.blue(`\nUsage:`));
        log(chalk.blue(`\$ express-marko-generator <project-name>`));
    }
});

/**
 * @name isWindows
 * Helper function to check the current platform for Windows/Unix-ish.
 * @returns {Boolean} - Returns true if Windows, else false.
 */
const isWindows = () => {
    if (/^win/i.test(process.platform)) {
        return true;
    } else {
        return false;
    }
}